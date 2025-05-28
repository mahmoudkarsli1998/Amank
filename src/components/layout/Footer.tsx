export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="border-t py-8 bg-muted/50">
      <div className="container text-center text-sm text-muted-foreground">
        <p>&copy; {currentYear} أمانك أونلاين. جميع الحقوق محفوظة.</p>
        <p className="mt-1">شركة تأمين سيارات رائدة في مصر.</p>
      </div>
    </footer>
  );
}
