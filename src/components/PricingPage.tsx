import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";

const PricingPage = () => {
  const handleSubscribe = (planType: 'pro' | 'agency') => {
    // TODO: Integrate with Stripe payment
    console.log(`Subscribing to ${planType} plan`);
  };

  return (
    <div className="min-h-screen bg-gradient-primary py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">
            เลือกแผนที่เหมาะกับคุณ
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            จัดการโซเชียลมีเดียของคุณได้อย่างมืออาชีพด้วยแผนราคาที่คุ้มค่า
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {/* Freemium Plan */}
          <Card className="relative bg-white/10 backdrop-blur-sm border-white/20 text-white">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl">Freemium</CardTitle>
                <Badge variant="secondary" className="bg-white/20 text-white">
                  ฟรี
                </Badge>
              </div>
              <CardDescription className="text-white/70">
                เหมาะสำหรับการทดลองใช้งาน
              </CardDescription>
              <div className="text-4xl font-bold">
                ฟรี
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Check className="h-4 w-4 text-success" />
                  <span className="text-sm">โพสต์ไปยัง 1-2 แพลตฟอร์ม</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="h-4 w-4 text-success" />
                  <span className="text-sm">จำกัด 10 โพสต์/เดือน</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="h-4 w-4 text-success" />
                  <span className="text-sm">ดูประวัติโพสต์ (30 วัน)</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="h-4 w-4 text-success" />
                  <span className="text-sm">UI พื้นฐาน</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full bg-white/20 hover:bg-white/30 text-white border-white/20"
                variant="outline"
              >
                เริ่มใช้งานฟรี
              </Button>
            </CardFooter>
          </Card>

          {/* Pro Plan */}
          <Card className="relative bg-white/10 backdrop-blur-sm border-primary text-white scale-105">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <Badge className="bg-primary text-primary-foreground px-6 py-2">
                แนะนำ
              </Badge>
            </div>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl">Pro Plan</CardTitle>
                <Badge variant="secondary" className="bg-primary/20 text-primary">
                  มืออาชีพ
                </Badge>
              </div>
              <CardDescription className="text-white/70">
                เหมาะสำหรับธุรกิจขนาดเล็ก
              </CardDescription>
              <div className="text-4xl font-bold">
                $15
                <span className="text-lg font-normal text-white/70">/เดือน</span>
              </div>
              <div className="text-sm text-white/60">
                (~450 บาท/เดือน)
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Check className="h-4 w-4 text-success" />
                  <span className="text-sm">โพสต์ไปยังทุกแพลตฟอร์ม</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="h-4 w-4 text-success" />
                  <span className="text-sm">Unlimited scheduling</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="h-4 w-4 text-success" />
                  <span className="text-sm">อัปโหลดสื่อ (รูป/วิดีโอ)</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="h-4 w-4 text-success" />
                  <span className="text-sm">ประวัติโพสต์ไม่จำกัด</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="h-4 w-4 text-success" />
                  <span className="text-sm">การวิเคราะห์พื้นฐาน</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="h-4 w-4 text-success" />
                  <span className="text-sm">รองรับ 5 บัญชีโซเชียล</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full bg-primary hover:bg-primary/90"
                onClick={() => handleSubscribe('pro')}
              >
                เลือกแผน Pro
              </Button>
            </CardFooter>
          </Card>

          {/* Agency Plan */}
          <Card className="relative bg-white/10 backdrop-blur-sm border-white/20 text-white">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl">Agency Plan</CardTitle>
                <Badge variant="secondary" className="bg-warning/20 text-warning">
                  องค์กร
                </Badge>
              </div>
              <CardDescription className="text-white/70">
                เหมาะสำหรับเอเจนซี่และทีมใหญ่
              </CardDescription>
              <div className="text-4xl font-bold">
                $99
                <span className="text-lg font-normal text-white/70">/เดือน</span>
              </div>
              <div className="text-sm text-white/60">
                (~3,000 บาท/เดือน)
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Check className="h-4 w-4 text-success" />
                  <span className="text-sm">Profile Keys สำหรับหลายผู้ใช้</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="h-4 w-4 text-success" />
                  <span className="text-sm">รองรับ 20+ บัญชีโซเชียล</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="h-4 w-4 text-success" />
                  <span className="text-sm">การวิเคราะห์ขั้นสูง</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="h-4 w-4 text-success" />
                  <span className="text-sm">การจัดการทีม</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="h-4 w-4 text-success" />
                  <span className="text-sm">อัปโหลดสื่อไม่จำกัด</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="h-4 w-4 text-success" />
                  <span className="text-sm">Messaging Add-On</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full bg-warning hover:bg-warning/90 text-warning-foreground"
                onClick={() => handleSubscribe('agency')}
              >
                เลือกแผน Agency
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Comparison with Competitors */}
        <div className="bg-white/5 backdrop-blur-sm rounded-lg p-8 border border-white/10">
          <h3 className="text-2xl font-bold text-white mb-6 text-center">
            เปรียบเทียบกับคู่แข่ง
          </h3>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <h4 className="font-semibold text-white mb-2">SocialBee Pro</h4>
              <p className="text-white/70">$29/เดือน</p>
              <p className="text-sm text-white/60">ฟีเจอร์จำกัด</p>
            </div>
            <div>
              <h4 className="font-semibold text-primary mb-2">Boost Post Engine Pro</h4>
              <p className="text-primary">$15/เดือน</p>
              <p className="text-sm text-white/80">รองรับแพลตฟอร์มมากกว่า</p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-2">Sociality.io Pro</h4>
              <p className="text-white/70">$99/เดือน</p>
              <p className="text-sm text-white/60">ราคาแพงกว่า</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;