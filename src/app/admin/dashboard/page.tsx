import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Users, BarChart3, MessageSquare, AlertTriangle, FileText } from 'lucide-react';

export default function AdminDashboardPage() {
  const stats = [
    { title: "إجمالي العملاء المحتملين", value: "125", icon: Users, change: "+15 هذا الأسبوع" },
    { title: "عملاء محتملون جدد اليوم", value: "8", icon: Users, change: "+2 عن الأمس" , color: "text-green-500"},
    { title: "متوسط درجة الاهتمام", value: "0.68", icon: BarChart3, change: "مستقر" },
    { title: "رسائل واتساب المرسلة", value: "350", icon: MessageSquare, change: "75% معدل فتح" },
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-primary">لوحة التحكم الرئيسية</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-5 w-5 ${stat.color || 'text-muted-foreground'}`} />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground pt-1">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>العملاء المحتملون حسب التصنيف</CardTitle>
            <CardDescription>توزيع العملاء المحتملين بناءً على درجة الاهتمام المقدرة بواسطة الذكاء الاصطناعي.</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Placeholder for chart */}
            <div className="h-[300px] w-full bg-gray-100 flex items-center justify-center rounded-md">
              <BarChart3 className="h-16 w-16 text-muted-foreground" />
              <p className="ml-2 text-muted-foreground">سيتم عرض الرسم البياني هنا</p>
            </div>
            <ul className="mt-4 space-y-2 text-sm">
                <li className="flex justify-between"><span>عملاء ساخنون (0.8 - 1.0)</span> <strong>20</strong></li>
                <li className="flex justify-between"><span>عملاء دافئون (0.5 - 0.79)</span> <strong>55</strong></li>
                <li className="flex justify-between"><span>عملاء باردون (0 - 0.49)</span> <strong>50</strong></li>
            </ul>
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>آخر الأنشطة</CardTitle>
             <CardDescription>ملخص لأحدث الإجراءات والتنبيهات في النظام.</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {[
                { text: "تم إضافة عميل محتمل جديد: أحمد خالد", time: "منذ 5 دقائق", icon: Users, color: "text-green-500" },
                { text: "تقييم AI لـ سارة علي: 0.85 (ساخن)", time: "منذ 15 دقيقة", icon: AlertTriangle, color: "text-orange-500" },
                { text: "تم إرسال رسالة واتساب تلقائية لـ 5 عملاء دافئون", time: "منذ ساعة", icon: MessageSquare, color: "text-blue-500" },
                { text: "تحديث محتوى صفحة 'لماذا تختارنا'", time: "منذ 3 ساعات", icon: FileText, color: "text-purple-500" },
              ].map((activity, index) => (
                <li key={index} className="flex items-start gap-3">
                  <activity.icon className={`h-5 w-5 mt-0.5 ${activity.color}`} />
                  <div>
                    <p className="text-sm font-medium">{activity.text}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
