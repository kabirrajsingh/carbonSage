// app/files/[filepath]/page.js
import FileViewer from "@/app/components/FileViewer";
export default async function FilePage({ params }) {
  return <FileViewer params={params} />;
}
