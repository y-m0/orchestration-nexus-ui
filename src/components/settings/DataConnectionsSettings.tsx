
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export function DataConnectionsSettings() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Data Connections</CardTitle>
          <CardDescription>Configure external data sources for agent access</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Connection Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Used</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Main Database</TableCell>
                <TableCell>PostgreSQL</TableCell>
                <TableCell><Badge>Connected</Badge></TableCell>
                <TableCell>Just now</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm">Edit</Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Analytics Data</TableCell>
                <TableCell>BigQuery</TableCell>
                <TableCell><Badge>Connected</Badge></TableCell>
                <TableCell>3 hours ago</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm">Edit</Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Document Storage</TableCell>
                <TableCell>S3 Bucket</TableCell>
                <TableCell><Badge variant="outline">Disconnected</Badge></TableCell>
                <TableCell>2 days ago</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm">Edit</Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">CRM System</TableCell>
                <TableCell>API</TableCell>
                <TableCell><Badge>Connected</Badge></TableCell>
                <TableCell>1 day ago</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm">Edit</Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <div className="mt-6">
            <Button>+ Add Connection</Button>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>API Keys</CardTitle>
          <CardDescription>Manage API keys for external services</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="openai-key">OpenAI API Key</Label>
            <div className="flex gap-2">
              <Input id="openai-key" type="password" value="sk-••••••••••••••••••••••••••••••" readOnly />
              <Button variant="outline">Reveal</Button>
              <Button variant="outline">Update</Button>
            </div>
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="aws-key">AWS Access Key</Label>
            <div className="flex gap-2">
              <Input id="aws-key" type="password" value="AKIA••••••••••••••••" readOnly />
              <Button variant="outline">Reveal</Button>
              <Button variant="outline">Update</Button>
            </div>
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="gcp-key">Google Cloud Key</Label>
            <div className="flex gap-2">
              <Input id="gcp-key" type="password" value="••••••••••••••••••••••••••••••" readOnly />
              <Button variant="outline">Reveal</Button>
              <Button variant="outline">Update</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
