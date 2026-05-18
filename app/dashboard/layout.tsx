// app/dashboard/layout.tsx
import Sidebar from '@/components/Sidebar';
import Navbar from '@/components/Navbar';
import HomeButton from '@/components/HomeButton';
export default function DashboardLayout({children}:{children:React.ReactNode}) {
  return (
    <div className="min-h-screen flex">
      <Sidebar/>
      <div className="flex-1 ml-0 lg:ml-64">
        <Navbar/><HomeButton/>
        <main className="pt-20 px-6 pb-16 max-w-7xl mx-auto">{children}</main>
      </div>
    </div>
  );
}