
"use client";

import { useState, useEffect }from 'react';
import InsuranceCalculatorForm from '@/components/insurance-calculator-form';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import type { ScoredLead } from '@/types';
import { format } from 'date-fns';
import { arSA } from 'date-fns/locale';
import { Loader2 } from 'lucide-react';

export default function AdminLeadsPage() {
  const [scoredLeads, setScoredLeads] = useState<ScoredLead[]>([]);
  const [clientOnly, setClientOnly] = useState(false);

  useEffect(() => {
    setClientOnly(true);
    if (typeof window !== 'undefined') {
      const storedLeads = localStorage.getItem('scoredLeads');
      if (storedLeads) {
        setScoredLeads(JSON.parse(storedLeads));
      }
    }
  }, []);


  const handleNewLeadScored = (lead: ScoredLead) => {
    setScoredLeads(prevLeads => {
      const updatedLeads = [lead, ...prevLeads];
      if (typeof window !== 'undefined') {
        localStorage.setItem('scoredLeads', JSON.stringify(updatedLeads));
      }
      return updatedLeads;
    });
  };

  const getLeadScoreBadgeVariant = (score: number): "default" | "secondary" | "destructive" | "outline" => {
    if (score >= 0.8) return "default";
    if (score >= 0.5) return "secondary";
    return "outline";
  };

  if (!clientOnly) {
      return (
        <div className="flex justify-center items-center h-screen">
          <Card className="p-8 shadow-xl">
            <CardTitle className="text-xl text-center text-primary">جارٍ التحميل...</CardTitle>
            <Loader2 className="mx-auto mt-4 h-12 w-12 animate-spin text-primary" />
          </Card>
        </div>
      );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-primary">إدارة العملاء المحتملين</h1>
        <p className="text-muted-foreground">
          أضف عملاء جدد يدويًا لتقييمهم بواسطة الذكاء الاصطناعي أو استعرض العملاء الحاليين.
        </p>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>إضافة وتقييم عميل محتمل جديد</CardTitle>
          <CardDescription>
            املأ بيانات العميل المحتمل أدناه ليقوم نظام الذكاء الاصطناعي بتقييم درجة اهتمامه.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <InsuranceCalculatorForm onLeadScored={handleNewLeadScored} />
        </CardContent>
      </Card>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>قائمة العملاء المحتملين المقيمين</CardTitle>
          <CardDescription>
            جدول يعرض جميع العملاء المحتملين مع درجة الاهتمام المقدرة وسبب التقييم.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {scoredLeads.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">لا يوجد عملاء محتملون لعرضهم حتى الآن. قم بإضافة عميل جديد.</p>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>الاسم</TableHead>
                    <TableHead>الهاتف</TableHead>
                    <TableHead>البريد الإلكتروني</TableHead>
                    <TableHead>فئة السيارة</TableHead>
                    <TableHead>ماركة السيارة</TableHead>
                    <TableHead>طراز السيارة</TableHead>
                    <TableHead>درجة الاهتمام</TableHead>
                    <TableHead>سبب التقييم</TableHead>
                    <TableHead>الرسالة</TableHead>
                    <TableHead>تاريخ الإرسال</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {scoredLeads.map((lead) => (
                    <TableRow key={lead.id}>
                      <TableCell className="font-medium">{lead.name}</TableCell>
                      <TableCell>{lead.phone}</TableCell>
                      <TableCell>{lead.email}</TableCell>
                      <TableCell>{lead.carCategory}</TableCell>
                      <TableCell>{lead.carMake}</TableCell>
                      <TableCell>{lead.carModel}</TableCell>
                      <TableCell>
                        <Badge variant={getLeadScoreBadgeVariant(lead.leadScore)}>
                          {lead.leadScore.toFixed(2)}
                        </Badge>
                      </TableCell>
                      <TableCell className="max-w-xs truncate" title={lead.reason}>{lead.reason}</TableCell>
                      <TableCell className="max-w-[200px] truncate" title={lead.message}>{lead.message || '-'}</TableCell>
                      <TableCell>
                        {format(new Date(lead.submissionDate), "PPpp", { locale: arSA })}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
