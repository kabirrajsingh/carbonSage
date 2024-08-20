// app/page.js
"use client";
import FileUpload from './components/FileUpload';
import { useSession } from './context/SessionContext';
import { useRouter } from 'next/navigation';
export default function Home() {
  const router=useRouter()
  const { sessionId } = useSession();

  if (sessionId) {
    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-6">Upload Project</h1>
      <FileUpload />
    </div>
  );
}
