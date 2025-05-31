
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { insurancePlans, type InsurancePlan } from '@/lib/constants';
import { CheckCircle, ShieldAlert } from 'lucide-react';
import Link from 'next/link';

export default function InsurancePlanTable() {
  return (
    <Card className="shadow-xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-3xl">
          <ShieldAlert className="h-8 w-8 text-primary" />
          خطط التأمين لدينا
        </CardTitle>
        <CardDescription>جد التغطية المثالية لاحتياجاتك. قارن بين خططنا أدناه.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px] text-lg">اسم الخطة</TableHead>
                <TableHead className="text-lg">مثالية لـ</TableHead>
                <TableHead className="text-lg">الميزات الرئيسية</TableHead>
                <TableHead className="text-right text-lg">السعر</TableHead>
                <TableHead className="text-center text-lg">الإجراء</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {insurancePlans.map((plan: InsurancePlan) => (
                <TableRow key={plan.name} className="hover:bg-muted/50">
                  <TableCell className="font-semibold text-md text-primary">{plan.name}</TableCell>
                  <TableCell className="text-sm">{plan.idealFor}</TableCell>
                  <TableCell>
                    <ul className="list-none space-y-1">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-green-500 shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </TableCell>
                  <TableCell className="text-right font-medium">{plan.price}</TableCell>
                  <TableCell className="text-center">
                    <Button asChild variant="default" size="sm">
                      <Link href="/#get-quote">اختر الخطة</Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
