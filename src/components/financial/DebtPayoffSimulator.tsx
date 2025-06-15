
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import { CreditCard, GraduationCap, Home, TrendingDown, DollarSign } from "lucide-react";

interface DebtPayoffSimulatorProps {
  salary: number;
}

interface Debt {
  id: string;
  name: string;
  icon: React.ReactNode;
  balance: number;
  interestRate: number;
  minimumPayment: number;
  color: string;
}

const DebtPayoffSimulator: React.FC<DebtPayoffSimulatorProps> = ({ salary }) => {
  const monthlyIncome = Math.round(salary * 0.75 / 12);
  
  const [debts, setDebts] = useState<Debt[]>([
    {
      id: 'student-loan',
      name: 'Student Loans',
      icon: <GraduationCap className="h-5 w-5" />,
      balance: 35000,
      interestRate: 5.5,
      minimumPayment: 350,
      color: 'bg-blue-500'
    },
    {
      id: 'credit-card',
      name: 'Credit Cards',
      icon: <CreditCard className="h-5 w-5" />,
      balance: 8500,
      interestRate: 18.5,
      minimumPayment: 170,
      color: 'bg-red-500'
    },
    {
      id: 'car-loan',
      name: 'Car Loan',
      icon: <Home className="h-5 w-5" />,
      balance: 22000,
      interestRate: 4.2,
      minimumPayment: 385,
      color: 'bg-green-500'
    }
  ]);

  const [extraPayment, setExtraPayment] = useState<number>(500);
  const [payoffStrategy, setPayoffStrategy] = useState<'snowball' | 'avalanche'>('avalanche');

  const updateDebt = (debtId: string, field: keyof Debt, value: number) => {
    setDebts(prev => prev.map(debt => 
      debt.id === debtId ? { ...debt, [field]: value } : debt
    ));
  };

  const calculatePayoffTime = (balance: number, interestRate: number, monthlyPayment: number) => {
    if (monthlyPayment <= (balance * interestRate / 100 / 12)) {
      return Infinity; // Payment too low to cover interest
    }
    
    const monthlyInterestRate = interestRate / 100 / 12;
    const months = -Math.log(1 - (balance * monthlyInterestRate) / monthlyPayment) / Math.log(1 + monthlyInterestRate);
    return Math.ceil(months);
  };

  const calculateTotalInterest = (balance: number, interestRate: number, monthlyPayment: number) => {
    const months = calculatePayoffTime(balance, interestRate, monthlyPayment);
    if (months === Infinity) return Infinity;
    return (months * monthlyPayment) - balance;
  };

  const getPayoffOrder = () => {
    const sortedDebts = [...debts];
    if (payoffStrategy === 'snowball') {
      return sortedDebts.sort((a, b) => a.balance - b.balance);
    } else {
      return sortedDebts.sort((a, b) => b.interestRate - a.interestRate);
    }
  };

  const simulatePayoffStrategy = () => {
    const orderedDebts = getPayoffOrder();
    let remainingExtraPayment = extraPayment;
    const results = [];
    
    for (const debt of orderedDebts) {
      const totalPayment = debt.minimumPayment + remainingExtraPayment;
      const months = calculatePayoffTime(debt.balance, debt.interestRate, totalPayment);
      const totalInterest = calculateTotalInterest(debt.balance, debt.interestRate, totalPayment);
      
      results.push({
        ...debt,
        totalPayment,
        months,
        totalInterest
      });
      
      remainingExtraPayment = 0; // Focus extra payment on one debt at a time
    }
    
    return results;
  };

  const payoffResults = simulatePayoffStrategy();
  const totalMinimumPayments = debts.reduce((sum, debt) => sum + debt.minimumPayment, 0);
  const totalDebtBalance = debts.reduce((sum, debt) => sum + debt.balance, 0);
  const totalPaymentCapacity = totalMinimumPayments + extraPayment;

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardHeader>
          <CardTitle className="text-center text-white">
            Debt Payoff Strategy Simulator
          </CardTitle>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div className="text-center">
              <div className="text-sm text-gray-400">Total Debt</div>
              <div className="text-2xl font-bold text-red-400">
                ${totalDebtBalance.toLocaleString()}
              </div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-400">Minimum Payments</div>
              <div className="text-2xl font-bold text-yellow-400">
                ${totalMinimumPayments.toLocaleString()}
              </div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-400">Monthly Income</div>
              <div className="text-2xl font-bold text-green-400">
                ${monthlyIncome.toLocaleString()}
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Strategy Selection */}
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardHeader>
          <CardTitle className="text-white">Choose Your Payoff Strategy</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button
              variant={payoffStrategy === 'avalanche' ? 'default' : 'outline'}
              className={`h-auto p-4 ${
                payoffStrategy === 'avalanche' 
                  ? 'bg-purple-600 hover:bg-purple-700' 
                  : 'border-white/30 text-white hover:bg-white/10'
              }`}
              onClick={() => setPayoffStrategy('avalanche')}
            >
              <div className="text-left">
                <div className="font-bold">Debt Avalanche</div>
                <div className="text-sm opacity-80">Pay highest interest rate first</div>
                <div className="text-xs opacity-60 mt-1">Saves more money on interest</div>
              </div>
            </Button>
            
            <Button
              variant={payoffStrategy === 'snowball' ? 'default' : 'outline'}
              className={`h-auto p-4 ${
                payoffStrategy === 'snowball' 
                  ? 'bg-purple-600 hover:bg-purple-700' 
                  : 'border-white/30 text-white hover:bg-white/10'
              }`}
              onClick={() => setPayoffStrategy('snowball')}
            >
              <div className="text-left">
                <div className="font-bold">Debt Snowball</div>
                <div className="text-sm opacity-80">Pay smallest balance first</div>
                <div className="text-xs opacity-60 mt-1">Builds psychological momentum</div>
              </div>
            </Button>
          </div>

          <div className="space-y-2">
            <Label className="text-white">Extra Monthly Payment: ${extraPayment}</Label>
            <Slider
              value={[extraPayment]}
              onValueChange={(value) => setExtraPayment(value[0])}
              max={Math.max(1000, monthlyIncome - totalMinimumPayments - 2000)}
              step={50}
              className="w-full"
            />
            <div className="text-sm text-gray-400">
              Available for extra payments: ${Math.max(0, monthlyIncome - totalMinimumPayments - 2000).toLocaleString()} 
              (after minimum payments and living expenses)
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Individual Debt Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {debts.map((debt) => (
          <Card key={debt.id} className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${debt.color} text-white`}>
                  {debt.icon}
                </div>
                <div>
                  <CardTitle className="text-white">{debt.name}</CardTitle>
                  <p className="text-sm text-gray-400">Customize your debt details</p>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-white">Balance</Label>
                  <Input
                    type="number"
                    value={debt.balance}
                    onChange={(e) => updateDebt(debt.id, 'balance', parseFloat(e.target.value) || 0)}
                    className="bg-white/10 border-white/20 text-white"
                  />
                </div>
                <div>
                  <Label className="text-white">Interest Rate (%)</Label>
                  <Input
                    type="number"
                    step="0.1"
                    value={debt.interestRate}
                    onChange={(e) => updateDebt(debt.id, 'interestRate', parseFloat(e.target.value) || 0)}
                    className="bg-white/10 border-white/20 text-white"
                  />
                </div>
              </div>
              
              <div>
                <Label className="text-white">Minimum Payment</Label>
                <Input
                  type="number"
                  value={debt.minimumPayment}
                  onChange={(e) => updateDebt(debt.id, 'minimumPayment', parseFloat(e.target.value) || 0)}
                  className="bg-white/10 border-white/20 text-white"
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Payoff Results */}
      <Card className="bg-gradient-to-r from-green-600/80 to-blue-600/80 backdrop-blur-sm border-white/20">
        <CardHeader>
          <CardTitle className="text-white">Your Debt-Free Journey</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {payoffResults.map((result, index) => (
              <div key={result.id} className="bg-white/10 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl font-bold text-purple-300">#{index + 1}</div>
                    <div className={`p-2 rounded-lg ${result.color} text-white`}>
                      {result.icon}
                    </div>
                    <div>
                      <div className="text-white font-medium">{result.name}</div>
                      <div className="text-sm text-gray-400">
                        ${result.balance.toLocaleString()} at {result.interestRate}% APR
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-white font-bold">
                      {result.months === Infinity ? 'Never' : `${Math.floor(result.months / 12)}y ${result.months % 12}m`}
                    </div>
                    <div className="text-sm text-gray-400">
                      ${result.totalPayment.toLocaleString()}/month
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-400">Total Interest: </span>
                    <span className="text-red-300 font-medium">
                      ${result.totalInterest === Infinity ? '∞' : result.totalInterest.toLocaleString()}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-400">Total Paid: </span>
                    <span className="text-white font-medium">
                      ${result.totalInterest === Infinity ? '∞' : (result.balance + result.totalInterest).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 pt-6 border-t border-white/20">
            <div className="text-center space-y-2">
              <h3 className="text-xl font-bold text-white">Debt-Free Date</h3>
              <div className="text-3xl font-bold text-green-400">
                {Math.max(...payoffResults.map(r => r.months)) === Infinity 
                  ? 'Need Higher Payments' 
                  : new Date(Date.now() + Math.max(...payoffResults.map(r => r.months)) * 30 * 24 * 60 * 60 * 1000).toLocaleDateString()
                }
              </div>
              <div className="text-sm text-gray-400">
                Total time to become debt-free: {Math.max(...payoffResults.map(r => r.months)) === Infinity 
                  ? 'Never with current payments' 
                  : `${Math.floor(Math.max(...payoffResults.map(r => r.months)) / 12)} years ${Math.max(...payoffResults.map(r => r.months)) % 12} months`
                }
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DebtPayoffSimulator;
