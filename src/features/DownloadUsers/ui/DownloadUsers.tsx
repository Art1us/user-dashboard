import { Button } from "@/shared/ui/button";
import { downloadJsonToCsv } from "../lib/downloadJsonToCsv";

export function DownloadUsers() {
  return <Button onClick={downloadJsonToCsv}>Download</Button>;
}
