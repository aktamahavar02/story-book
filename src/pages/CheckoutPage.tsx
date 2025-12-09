
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Minus, Plus, X, CreditCard, Truck, Shield, Lock } from "lucide-react";
import logo  from "../assets/svgs/logo.svg"

const CheckoutPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedBook, selections } = location.state || {};
  
  const [currentStep, setCurrentStep] = useState(1); // 1: Cart, 2: Shipping, 3: Payment
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      title: selectedBook?.title || "Your Personalized Story",
      thumbnail: selectedBook?.coverImage || "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=100&h=120&fit=crop",
      price: 19.99,
      quantity: 1,
      format: "Digital + Print"
    }
  ]);

  const [shippingInfo, setShippingInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    zipCode: "",
    country: "United States"
  });

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardName: ""
  });

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity === 0) {
      setCartItems(cartItems.filter(item => item.id !== id));
    } else {
      setCartItems(cartItems.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      ));
    }
  };

  const removeItem = (id: number) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 25 ? 0 : 5.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      // Process payment and redirect to thank you page
      navigate("/thank-you", { state: { orderDetails: { total, items: cartItems } } });
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      navigate(-1);
    }
  };

  const canProceed = () => {
    if (currentStep === 1) return cartItems.length > 0;
    if (currentStep === 2) {
      return shippingInfo.firstName && shippingInfo.lastName && shippingInfo.email && 
             shippingInfo.address && shippingInfo.city && shippingInfo.zipCode;
    }
    if (currentStep === 3) {
      return paymentInfo.cardNumber && paymentInfo.expiryDate && 
             paymentInfo.cvv && paymentInfo.cardName;
    }
    return false;
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Shopping Cart</h2>
              <Badge variant="outline" className="text-sm">
                {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}
              </Badge>
            </div>
            
            {cartItems.length === 0 ? (
              <Card className="border-dashed border-2">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <X className="h-8 w-8 text-gray-400" />
                  </div>
                  <p className="text-gray-500 mb-4">Your cart is empty</p>
                  <Button onClick={() => navigate("/")} className="bg-purple-600 hover:bg-purple-700">
                    Continue Shopping
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <Card key={item.id} className="overflow-hidden">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-6">
                        <div className="relative">
                          <img 
                            src={item.thumbnail} 
                            alt={item.title}
                            className="w-20 h-24 object-cover rounded-lg border-2 border-gray-200"
                          />
                          <Badge className="absolute -top-2 -right-2 bg-purple-600">
                            Digital + Print
                          </Badge>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-lg text-gray-900 truncate">{item.title}</h3>
                          <p className="text-sm text-gray-600 mb-2">{item.format}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="h-8 w-8 p-0"
                              >
                                <Minus className="h-4 w-4" />
                              </Button>
                              <span className="font-medium text-lg w-8 text-center">{item.quantity}</span>
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="h-8 w-8 p-0"
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                            </div>
                            <div className="text-right">
                              <p className="text-2xl font-bold text-purple-600">${item.price.toFixed(2)}</p>
                              <Button 
                                size="sm" 
                                variant="ghost"
                                onClick={() => removeItem(item.id)}
                                className="text-red-500 hover:text-red-700 h-8"
                              >
                                <X className="h-4 w-4 mr-1" />
                                Remove
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Truck className="h-5 w-5 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Shipping Information</h2>
            </div>
            
            <Card className="border-2 border-blue-100">
              <CardHeader className="bg-blue-50">
                <CardTitle className="text-lg text-blue-900">Delivery Details</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName" className="text-sm font-medium text-gray-700">First Name *</Label>
                    <Input
                      id="firstName"
                      value={shippingInfo.firstName}
                      onChange={(e) => setShippingInfo({...shippingInfo, firstName: e.target.value})}
                      className="mt-1"
                      placeholder="Enter first name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName" className="text-sm font-medium text-gray-700">Last Name *</Label>
                    <Input
                      id="lastName"
                      value={shippingInfo.lastName}
                      onChange={(e) => setShippingInfo({...shippingInfo, lastName: e.target.value})}
                      className="mt-1"
                      placeholder="Enter last name"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={shippingInfo.email}
                    onChange={(e) => setShippingInfo({...shippingInfo, email: e.target.value})}
                    className="mt-1"
                    placeholder="Enter email address"
                  />
                </div>
                
                <div>
                  <Label htmlFor="address" className="text-sm font-medium text-gray-700">Street Address *</Label>
                  <Input
                    id="address"
                    value={shippingInfo.address}
                    onChange={(e) => setShippingInfo({...shippingInfo, address: e.target.value})}
                    className="mt-1"
                    placeholder="Enter street address"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city" className="text-sm font-medium text-gray-700">City *</Label>
                    <Input
                      id="city"
                      value={shippingInfo.city}
                      onChange={(e) => setShippingInfo({...shippingInfo, city: e.target.value})}
                      className="mt-1"
                      placeholder="Enter city"
                    />
                  </div>
                  <div>
                    <Label htmlFor="zipCode" className="text-sm font-medium text-gray-700">ZIP Code *</Label>
                    <Input
                      id="zipCode"
                      value={shippingInfo.zipCode}
                      onChange={(e) => setShippingInfo({...shippingInfo, zipCode: e.target.value})}
                      className="mt-1"
                      placeholder="Enter ZIP code"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <CreditCard className="h-5 w-5 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Payment Information</h2>
            </div>
            
            <Card className="border-2 border-green-100">
              <CardHeader className="bg-green-50">
                <CardTitle className="flex items-center gap-2 text-lg text-green-900">
                  <Shield className="h-5 w-5" />
                  Secure Payment
                </CardTitle>
                <p className="text-sm text-green-700">Your payment information is encrypted and secure</p>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div>
                  <Label htmlFor="cardName" className="text-sm font-medium text-gray-700">Name on Card *</Label>
                  <Input
                    id="cardName"
                    value={paymentInfo.cardName}
                    onChange={(e) => setPaymentInfo({...paymentInfo, cardName: e.target.value})}
                    className="mt-1"
                    placeholder="Enter name as shown on card"
                  />
                </div>
                
                <div>
                  <Label htmlFor="cardNumber" className="text-sm font-medium text-gray-700">Card Number *</Label>
                  <div className="relative">
                    <Input
                      id="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      value={paymentInfo.cardNumber}
                      onChange={(e) => setPaymentInfo({...paymentInfo, cardNumber: e.target.value})}
                      className="mt-1 pl-10"
                    />
                    <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 mt-0.5" />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="expiryDate" className="text-sm font-medium text-gray-700">Expiry Date *</Label>
                    <Input
                      id="expiryDate"
                      placeholder="MM/YY"
                      value={paymentInfo.expiryDate}
                      onChange={(e) => setPaymentInfo({...paymentInfo, expiryDate: e.target.value})}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="cvv" className="text-sm font-medium text-gray-700">CVV *</Label>
                    <div className="relative">
                      <Input
                        id="cvv"
                        placeholder="123"
                        value={paymentInfo.cvv}
                        onChange={(e) => setPaymentInfo({...paymentInfo, cvv: e.target.value})}
                        className="mt-1 pl-10"
                      />
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 mt-0.5" />
                    </div>
                  </div>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center space-x-2 text-blue-800">
                    <Shield className="h-4 w-4" />
                    <span className="text-sm font-medium">Secure checkout powered by 256-bit SSL encryption</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-100 px-4 py-4 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src={logo} alt="log" className="w-20"/>
          
          </div>
          <div className="flex items-center space-x-2">
            <Shield className="h-4 w-4 text-green-600" />
            <span className="text-sm text-gray-600">Secure Checkout</span>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center mb-6">
          <Button 
            variant="ghost" 
            onClick={handleBack}
            className="mr-4 hover:bg-white/50"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-1">Secure Checkout</h1>
            <p className="text-gray-600">Complete your purchase securely</p>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          {[
            { step: 1, title: "Review Cart", icon: <div className="w-4 h-4 bg-current rounded" /> },
            { step: 2, title: "Shipping", icon: <Truck className="w-4 h-4" /> },
            { step: 3, title: "Payment", icon: <CreditCard className="w-4 h-4" /> }
          ].map((item, index) => (
            <div key={item.step} className="flex items-center">
              <div className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all ${
                item.step <= currentStep 
                  ? 'bg-purple-600 border-purple-600 text-white shadow-lg' 
                  : 'border-gray-300 text-gray-400 bg-white'
              }`}>
                {item.icon}
              </div>
              <div className="ml-3">
                <span className={`text-sm font-medium ${
                  item.step <= currentStep ? 'text-purple-600' : 'text-gray-400'
                }`}>
                  {item.title}
                </span>
              </div>
              {index < 2 && (
                <div className={`w-20 h-0.5 mx-6 ${
                  item.step < currentStep ? 'bg-purple-600' : 'bg-gray-300'
                }`} />
              )}
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {renderStepContent()}
          </div>

          {/* Order Summary */}
          <div>
            <Card className="sticky top-24 border-2 border-purple-100">
              <CardHeader className="bg-purple-50">
                <CardTitle className="text-purple-900">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex justify-between font-bold text-xl text-gray-900">
                      <span>Total</span>
                      <span className="text-purple-600">${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3 pt-4">
                  <Button 
                    onClick={handleNext}
                    disabled={!canProceed()}
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium h-12 text-lg shadow-lg"
                  >
                    {currentStep === 1 ? 'Continue to Shipping' : 
                     currentStep === 2 ? 'Continue to Payment' : 
                     'Complete Order'}
                  </Button>
                  
                  <div className="flex items-center justify-center space-x-2 text-xs text-gray-500">
                    <Lock className="h-3 w-3" />
                    <span>SSL secured • 30-day money back guarantee</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
