
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { AlertTriangle, Shield, TrendingDown, Users, Car, Heart } from 'lucide-react';

export default function InfographicSection() {
  return (
    <section className="py-16 md:py-24 bg-slate-800/20/30/30">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold leading-tight tracking-[-0.03em] md:text-4xl font-bold leading-none tracking-[-0.035em] font-bold text-violet-400">أهمية التأمين في أرقام</h2>
          <p className="mt-4 text-lg font-medium leading-relaxed tracking-[-0.01em] text-slate-100/80 max-w-2xl mx-auto">
            نظرة على إحصائيات حوادث السيارات في مصر وأهمية وجود تغطية تأمينية مناسبة.
          </p>
        </div>

        {/* Main Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="text-center border-red-200 bg-red-50/20">
            <CardContent className="pt-6">
              <div className="flex justify-center mb-4">
                <AlertTriangle className="h-12 w-12 text-rose-600" />
              </div>
              <div className="text-3xl font-bold leading-tight tracking-[-0.03em] font-bold text-rose-700 mb-2">5,861</div>
              <p className="text-sm font-normal leading-relaxed text-rose-600">وفاة بسبب حوادث الطرق في مصر عام 2023</p>
            </CardContent>
          </Card>

<Card className="text-center border-orange-200 bg-orange-50/20">
            <CardContent className="pt-6">
              <div className="flex justify-center mb-4">
                <Users className="h-12 w-12 text-orange-600" />
              </div>
              <div className="text-3xl font-bold leading-tight tracking-[-0.03em] font-bold text-orange-700 mb-2">42</div>
              <p className="text-sm font-normal leading-relaxed text-orange-600">وفاة لكل 100,000 نسمة - من أعلى المعدلات بالمنطقة</p>
            </CardContent>
          </Card>

          <Card className="text-center border-green-200 bg-green-50/20">
            <CardContent className="pt-6">
              <div className="flex justify-center mb-4">
                <TrendingDown className="h-12 w-12 text-emerald-600" />
              </div>
              <div className="text-3xl font-bold leading-tight tracking-[-0.03em] font-bold text-emerald-700 mb-2">24.5%</div>
              <p className="text-sm font-normal leading-relaxed text-emerald-600">انخفاض في الوفيات مقارنة بعام 2022</p>
            </CardContent>
          </Card>

          <Card className="text-center border-blue-200 bg-blue-50/20">
            <CardContent className="pt-6">
              <div className="flex justify-center mb-4">
                <Shield className="h-12 w-12 text-indigo-600" />
              </div>
              <div className="text-3xl font-bold leading-tight tracking-[-0.03em] font-bold text-indigo-700 mb-2">37.3</div>
              <p className="text-sm font-normal leading-relaxed text-indigo-600">مليار جنيه حجم سوق التأمين العام في مصر 2023</p>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Infographic */}
<Card className="shadow-lg overflow-hidden backdrop-blur-md bg-white/10 border border-white/20">
  <CardHeader className="bg-gradient-to-r from-white/20 via-blue-500/20 to-purple-500/20 backdrop-filter backdrop-blur-xl border-b border-white/10 text-slate-800 dark:text-slate-50">
    <CardTitle className="text-2xl font-semibold leading-tight tracking-[-0.025em] text-center drop-shadow-sm">
      إحصائيات شاملة حول السلامة المرورية والتأمين في مصر
    </CardTitle>
    <CardDescription className="text-slate-600 dark:text-slate-300 text-center font-medium drop-shadow-sm">
      البيانات الرسمية توضح الحاجة الماسة للتأمين لحماية استثماراتك وسلامتك
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8">
            
            {/* Road Safety Section */}
            <div className="mb-12">
              <h3 className="text-xl font-semibold leading-tight tracking-[-0.02em] font-bold text-center mb-8 flex items-center justify-center gap-2">
                <Car className="h-6 w-6 text-rose-600" />
                إحصائيات السلامة المرورية
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="bg-red-50/20 p-6 rounded-lg border-l-4 border-red-500">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-rose-700 font-semibold">الوفيات في 2023</span>
                      <span className="text-2xl font-semibold leading-tight tracking-[-0.025em] font-bold text-rose-800">5,861</span>
                    </div>
                    <div className="text-sm font-normal leading-relaxed text-rose-600">انخفاض من 7,762 في عام 2022</div>
                    <div className="w-full bg-red-200/20 rounded-full h-2 mt-2">
                      <div className="bg-red-600/20 h-2 rounded-full" style={{width: '75.5%'}}></div>
                    </div>
                  </div>

<div className="bg-orange-50/20 p-6 rounded-lg border-l-4 border-orange-500">
  <div className="flex items-center justify-between mb-2">
    <span className="text-orange-700 font-semibold">معدل الوفيات</span>
    <span className="text-2xl font-semibold leading-tight tracking-[-0.025em] font-bold text-orange-800">42</span>
  </div>
  <div className="text-sm font-normal leading-relaxed text-orange-600">لكل 100,000 نسمة - من أعلى المعدلات بالمنطقة</div>
</div>
                </div>

                <div className="space-y-6">
                  <div className="bg-yellow-50/20 p-6 rounded-lg border-l-4 border-yellow-500">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-amber-700 font-semibold">أسباب الإصابات</span>
                      <span className="text-2xl font-semibold leading-tight tracking-[-0.025em] font-bold text-amber-800">46.8%</span>
                    </div>
                    <div className="text-sm font-normal leading-relaxed text-amber-600">من الإصابات بسبب حوادث السيارات</div>
                  </div>

                  <div className="bg-purple-50/20 p-6 rounded-lg border-l-4 border-purple-500">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-violet-700 font-semibold">نسبة الذكور</span>
                      <span className="text-2xl font-semibold leading-tight tracking-[-0.025em] font-bold text-violet-800">77%</span>
                    </div>
                    <div className="text-sm font-normal leading-relaxed text-violet-600">من ضحايا حوادث الطرق على مستوى العالم</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Insurance Market Section */}
            <div className="mb-12">
              <h3 className="text-xl font-semibold leading-tight tracking-[-0.02em] font-bold text-center mb-8 flex items-center justify-center gap-2">
                <Shield className="h-6 w-6 text-indigo-600" />
                سوق التأمين في مصر
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="border-blue-200 bg-blue-50/20">
                  <CardContent className="pt-6 text-center">
                    <div className="text-3xl font-bold leading-tight tracking-[-0.03em] font-bold text-indigo-700 mb-2">37.3</div>
                    <p className="text-sm font-normal leading-relaxed text-indigo-600">مليار جنيه حجم السوق</p>
                    <p className="text-xs font-medium tracking-wide text-purple-500 mt-1">(1.2 مليار دولار)</p>
                  </CardContent>
                </Card>

                <Card className="border-green-200 bg-green-50/20">
                  <CardContent className="pt-6 text-center">
                    <div className="text-3xl font-bold leading-tight tracking-[-0.03em] font-bold text-emerald-700 mb-2">19%</div>
                    <p className="text-sm font-normal leading-relaxed text-emerald-600">معدل النمو السنوي المتوقع</p>
                    <p className="text-xs font-medium tracking-wide text-emerald-500 mt-1">2024-2028</p>
                  </CardContent>
                </Card>

                <Card className="border-purple-200 bg-purple-50/20">
                  <CardContent className="pt-6 text-center">
                    <div className="text-3xl font-bold leading-tight tracking-[-0.03em] font-bold text-violet-700 mb-2">5.0</div>
                    <p className="text-sm font-normal leading-relaxed text-violet-600">مليار دولار حجم السوق المتوقع</p>
                    <p className="text-xs font-medium tracking-wide text-violet-500 mt-1">بحلول 2028</p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Safety Tips Section */}
            <div className="backdrop-blur-md bg-gradient-to-br from-blue-50/20 to-green-50/20 border border-white/20 p-8 rounded-lg">
              <h3 className="text-xl font-semibold leading-tight tracking-[-0.02em] font-bold text-center mb-6 flex items-center justify-center gap-2">
                <Heart className="h-6 w-6 text-rose-600" />
                لماذا التأمين ضروري؟
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="text-center p-4 backdrop-blur-md bg-white/10 border border-white/20 rounded-lg shadow-sm">
                  <div className="text-2xl font-semibold leading-tight tracking-[-0.025em] font-bold text-indigo-600 mb-2">حماية مالية</div>
                  <p className="text-sm font-normal leading-relaxed text-slate-600">تغطية تكاليف الحوادث والإصلاحات</p>
                </div>
                
                <div className="text-center p-4 backdrop-blur-md bg-white/10 border border-white/20 rounded-lg shadow-sm">
                  <div className="text-2xl font-semibold leading-tight tracking-[-0.025em] font-bold text-emerald-600 mb-2">أمان قانوني</div>
                  <p className="text-sm font-normal leading-relaxed text-slate-600">تجنب المسائل القانونية والغرامات</p>
                </div>
                
                <div className="text-center p-4 backdrop-blur-md bg-white/10 border border-white/20 rounded-lg shadow-sm">
                  <div className="text-2xl font-semibold leading-tight tracking-[-0.025em] font-bold text-violet-600 mb-2">راحة البال</div>
                  <p className="text-sm font-normal leading-relaxed text-slate-600">القيادة بثقة وأمان تام</p>
                </div>
                
                <div className="text-center p-4 backdrop-blur-md bg-white/10 border border-white/20 rounded-lg shadow-sm">
                  <div className="text-2xl font-semibold leading-tight tracking-[-0.025em] font-bold text-orange-600 mb-2">خدمات طوارئ</div>
                  <p className="text-sm font-normal leading-relaxed text-slate-600">مساعدة فورية على الطريق</p>
                </div>
              </div>
            </div>

          </CardContent>
        </Card>

        <div className="mt-8 text-center text-sm font-normal leading-relaxed text-slate-300-foreground">
          <p>* البيانات مأخوذة من الجهاز المركزي للتعبئة العامة والإحصاء ومنظمة الصحة العالمية وتقارير السوق المحلية لعام 2023-2024</p>
        </div>
      </div>
    </section>
  );
}