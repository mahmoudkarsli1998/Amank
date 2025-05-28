"use client";

import { useState, useEffect }from 'react';
import InsuranceCalculatorForm from '@/components/insurance-calculator-form';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import type { ScoredLead } from '@/types';
import { format } from 'date-fns';
import { arSA } from 'date-fns/locale'; // For Arabic date formatting

export default function AdminLeadsPage() {
  const [scoredLeads, setScoredLeads] = useState<ScoredLead[]>([]);
  const [clientOnly, setClientOnly] = useState(false);

  useEffect(() => {
    setClientOnly(true);
    // Load leads from localStorage if available (for demo persistence)
    const storedLeads = localStorage.getItem('scoredLeads');
    if (storedLeads) {
      setScoredLeads(JSON.parse(storedLeads));
    }
  }, []);


  const handleNewLeadScored = (lead: ScoredLead) => {
    setScoredLeads(prevLeads => {
      const updatedLeads = [lead, ...prevLeads];
      // Save to localStorage (for demo persistence)
      if (typeof window !== 'undefined') {
        localStorage.setItem('scoredLeads', JSON.stringify(updatedLeads));
      }
      return updatedLeads;
    });
  };

  const getLeadScoreBadgeVariant = (score: number): "default" | "secondary" | "destructive" | "outline" => {
    if (score >= 0.8) return "default"; // Primary color (blue) for hot
    if (score >= 0.5) return "secondary"; // Orange for warm
    return "outline"; // Outline or a muted color for cold
  };
  
  if (!clientOnly) {
      return <div>جارٍ التحميل...</div>;
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
                    <TableHead>نوع السيارة</TableHead>
                    <TableHead>درجة الاهتمام</TableHead>
                    <TableHead>سبب التقييم</TableHead>
                    <TableHead>تاريخ الإرسال</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {scoredLeads.map((lead) => (
                    <TableRow key={lead.id}>
                      <TableCell className="font-medium">{lead.name}</TableCell>
                      <TableCell>{lead.phone}</TableCell>
                      <TableCell>{lead.email}</TableCell>
                      <TableCell>{lead.carType}</TableCell>
                      <TableCell>
                        <Badge variant={getLeadScoreBadgeVariant(lead.leadScore)}>
                          {lead.leadScore.toFixed(2)}
                        </Badge>
                      </TableCell>
                      <TableCell className="max-w-xs truncate">{lead.reason}</TableCell>
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
