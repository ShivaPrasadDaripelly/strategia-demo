import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useMemo, useState, useEffect, Fragment } from "react";
import { Plus, Trash2 } from "lucide-react";

function useQuery() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}

const resources = [
  "Project Manager",
  "UI/UX Designer",
  "Frontend Developer",
  "Backend Developer",
  "Quality Analyst",
  "Content Strategist",
  "DevOps Engineer",
];

// Demo datasets for dynamic population across tabs
const detailsDatasets = [
  [
    { phase: "Planning & Setup", rows: [
      { name: "Project Kickoff", start: 1, end: 1, color: "bg-indigo-200" },
      { name: "Requirement analysis and documentation", start: 1, end: 3, color: "bg-orange-200" },
      { name: "Planning & Setup", start: 2, end: 3, color: "bg-sky-200" },
    ]},
    { phase: "UI/UX Design Strategy", rows: [
      { name: "Create and finalize Figma designs", start: 3, end: 4, color: "bg-violet-200" },
      { name: "Design approval from stakeholders", start: 3, end: 6, color: "bg-green-200" },
    ]},
    { phase: "Development & Integration", rows: [
      { name: "Landing Page & 3-4 Sub pages with mobile responsiveness", start: 4, end: 7, color: "bg-rose-200" },
      { name: "Multilingual Functionality (EN, FR, SP)", start: 5, end: 8, color: "bg-sky-200" },
    ]},
  ],
  [
    { phase: "Discovery", rows: [
      { name: "Stakeholder Interviews", start: 1, end: 2, color: "bg-amber-200" },
      { name: "Competitive Analysis", start: 2, end: 3, color: "bg-indigo-200" },
    ]},
    { phase: "Design", rows: [
      { name: "Wireframes", start: 3, end: 3, color: "bg-sky-200" },
      { name: "Hi‑fi Mockups", start: 4, end: 5, color: "bg-purple-200" },
    ]},
    { phase: "Engineering", rows: [
      { name: "API Development", start: 3, end: 6, color: "bg-green-200" },
      { name: "Frontend Implementation", start: 4, end: 7, color: "bg-rose-200" },
    ]},
  ],
  [
    { phase: "Phase 1", rows: [
      { name: "Scoping", start: 1, end: 1, color: "bg-slate-300" },
      { name: "PoC", start: 2, end: 2, color: "bg-sky-200" },
    ]},
    { phase: "Phase 2", rows: [
      { name: "MVP", start: 3, end: 5, color: "bg-teal-200" },
    ]},
    { phase: "Phase 3", rows: [
      { name: "Hardening", start: 6, end: 8, color: "bg-orange-200" },
    ]},
  ],
] as const;

const effortsDatasets = [
  resources,
  ["Product Owner","Business Analyst","UX Researcher","Frontend Developer","Backend Developer","QA Engineer"],
  ["Tech Lead","UI Designer","Full‑stack Dev","Mobile Dev"],
] as const;

const costsDatasets = [
  resources.map((name, i) => ({ name, qty: 1, unitPrice: [4820,3170,2450,2250,2360,2750,3240][i] ?? 2200, months: 1.25 + (i % 4) * 0.5 })),
  [
    { name: "Product Owner", qty: 1, unitPrice: 5200, months: 1.0 },
    { name: "Business Analyst", qty: 1, unitPrice: 3800, months: 1.5 },
    { name: "UX Researcher", qty: 1, unitPrice: 3000, months: 1.25 },
    { name: "Frontend Developer", qty: 2, unitPrice: 2600, months: 3.0 },
    { name: "Backend Developer", qty: 1, unitPrice: 2500, months: 2.5 },
  ],
  [
    { name: "Tech Lead", qty: 1, unitPrice: 6000, months: 2.0 },
    { name: "Full‑stack Dev", qty: 2, unitPrice: 3200, months: 4.0 },
    { name: "QA Engineer", qty: 1, unitPrice: 2400, months: 2.5 },
  ],
] as const;

export default function Setup() {
  const q = useQuery();
  const navigate = useNavigate();
  const [projectName, setProjectName] = useState("");
  const [currency, setCurrency] = useState("INR");
  const [effortRows, setEffortRows] = useState<string[]>(resources);
  const [costRows, setCostRows] = useState<{ name: string; qty: number; unitPrice: number; months: number }[]>(costsDatasets[0] as any);

  const addEffortRow = (idx: number) => {
    setEffortRows((prev) => {
      const copy = [...prev];
      copy.splice(idx + 1, 0, "New Resource");
      return copy;
    });
  };

  const removeEffortRow = (idx: number) => {
    setEffortRows((prev) => {
      const copy = [...prev];
      copy.splice(idx, 1);
      if (copy.length === 0) copy.push("New Resource");
      return copy;
    });
  };

  const isStep1 = q.get("new") === "1";
  const seedParam = q.get("seed");
  const seed = Number.isFinite(Number(seedParam)) ? Number(seedParam) % 3 : 0;

  const weeks = Array.from({ length: 8 }).map((_, i) => `Week ${i + 1}`);
  const [tab, setTab] = useState<"details" | "efforts" | "cost">("details");

  type Row = { name: string; start: number; end: number; color: string };
  type Group = { phase: string; rows: Row[] };

  const [planGroups, setPlanGroups] = useState<Group[]>([
    {
      phase: "Planning & Setup",
      rows: [
        { name: "Project Kickoff", start: 1, end: 1, color: "bg-indigo-200" },
        { name: "Requirement analysis and documentation", start: 1, end: 3, color: "bg-orange-200" },
        { name: "Planning & Setup", start: 2, end: 3, color: "bg-sky-200" },
      ],
    },
    {
      phase: "UI/UX Design Strategy",
      rows: [
        { name: "Create and finalize Figma designs", start: 3, end: 4, color: "bg-violet-200" },
        { name: "Design approval from stakeholders", start: 3, end: 6, color: "bg-green-200" },
      ],
    },
    {
      phase: "Development & Integration",
      rows: [
        { name: "Landing Page & 3-4 Sub pages with mobile responsiveness", start: 4, end: 7, color: "bg-rose-200" },
        { name: "Multilingual Functionality (EN, FR, SP)", start: 5, end: 8, color: "bg-sky-200" },
      ],
    },
  ]);

  const addRow = (gi: number, afterIdx: number) => {
    setPlanGroups((prev) => {
      const copy = [...prev];
      const g = { ...copy[gi], rows: [...copy[gi].rows] } as Group;
      g.rows.splice(afterIdx + 1, 0, {
        name: "New Activity",
        start: 1,
        end: 2,
        color: "bg-sky-200",
      });
      copy[gi] = g;
      return copy;
    });
  };

  const removeRow = (gi: number, idx: number) => {
    setPlanGroups((prev) => {
      const copy = [...prev];
      const g = { ...copy[gi], rows: [...copy[gi].rows] } as Group;
      g.rows.splice(idx, 1);
      if (g.rows.length === 0) {
        g.rows = [{ name: "New Activity", start: 1, end: 1, color: "bg-slate-200" }];
      }
      copy[gi] = g;
      return copy;
    });
  };

  // Apply datasets when navigating with a seed param
  useEffect(() => {
    const d = seed;
    const e = (seed + 1) % 3;
    const c = (seed + 2) % 3;
    setPlanGroups(detailsDatasets[d] as any);
    setEffortRows(effortsDatasets[e] as any);
    setCostRows(costsDatasets[c] as any);
  }, [seed]);

  if (isStep1) {
    return (
      <Layout>
        <div className="rounded-2xl border bg-white shadow-sm p-6 md:p-10">
          <div className="text-center">
            <h1 className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-sky-500 to-indigo-600 bg-clip-text text-transparent">
              Turn Your Concepts Into Practical Strategies
            </h1>
            {/* <p className="mt-2 text-slate-600">What would you call your Project?</p> */}
          </div>

          <div className="mt-6 md:mt-8 max-w-4xl mx-auto space-y-4">
            <Input
              placeholder="Project Name"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="h-12 text-base"
            />

            <div className="grid md:grid-cols-2 gap-8 mt-8">
              <div>
                {/* <Textarea
                  placeholder="Describe your project requirements in detail. Example: User authentication system • Dashboard with analytics • Payment integration • Mobile responsive design • Admin panel for content management"
                  className="min-h-40 md:min-h-48 w-full h-full"
                /> */}
                <Textarea
  placeholder={`Describe your application. For example:
• Secure login and user roles
• Dashboard showing key metrics
• Online payment feature
• Works smoothly on mobile and tablet
• Admin area to manage data`}
  className="w-full h-full min-h-40 md:min-h-48 font-mono p-4 leading-relaxed whitespace-pre-line text-gray-800 border border-gray-300 rounded-2xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
  style={{
    whiteSpace: 'pre-wrap',
    textAlign: 'left',
  }}
/>


                <div className="mt-4">
                  <Button asChild variant="outline" className="rounded-full px-5">
                    <Link to="/strategia-demo">Go Back</Link>
                  </Button>
                </div>
              </div>
              <div>
                <div className="h-full rounded-xl border-2 border-dashed border-slate-300 grid place-items-center bg-slate-50/60">
                  <div className="text-center">
                    <div className="mx-auto size-14 rounded-xl grid place-items-center border border-slate-300 bg-white text-slate-500">
                      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor"><path d="M12 16a1 1 0 001-1V9.41l1.3 1.3a1 1 0 001.4-1.42l-3-3a1 1 0 00-1.4 0l-3 3a1 1 0 101.4 1.42L11 9.4V15a1 1 0 001 1z"/><path d="M5 18a2 2 0 01-2-2V8a2 2 0 012-2h3a1 1 0 010 2H5v8h14V8h-3a1 1 0 010-2h3a2 2 0 012 2v8a2 2 0 01-2 2H5z"/></svg>
                    </div>
                    <div className="mt-2 font-medium text-slate-700">Upload File</div>
                    <p className="text-xs text-slate-500">Supported formats: txt, md, pdf, doc, docx</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <Button
                onClick={() => {
                  const s = Math.floor(Math.random() * 3);
                  navigate(`/setup?seed=${s}`);
                }}
                className="rounded-full h-11 px-6 bg-gradient-to-r from-sky-500 to-indigo-600 text-white hover:from-sky-600 hover:to-indigo-600"
              >
                Generate Plan
              </Button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="flex items-center justify-between mb-4">
        <div className="text-slate-500 text-sm">Dashboard &gt; <span className="text-slate-700 font-medium">Project Estimates</span></div>
        <Button variant="outline" className="rounded-full">Download</Button>
      </div>

      <Tabs value={tab} onValueChange={(v) => setTab(v as any)} className="">
        <TabsList className="bg-slate-100">
          <TabsTrigger value="details">Project Details</TabsTrigger>
          <TabsTrigger value="efforts">Time & Efforts</TabsTrigger>
          <TabsTrigger value="cost">Project Cost</TabsTrigger>
        </TabsList>

        <TabsContent value="details">
          <div className="rounded-2xl border bg-white shadow-sm p-4 md:p-6">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-slate-800">Project Plan</h2>
              <Button size="sm" className="rounded-full">+ Add Phase</Button>
            </div>

            <div className="mt-4 overflow-x-auto">
              <table className="min-w-[900px] w-full text-sm">
                <thead>
                  <tr className="text-slate-500">
                    <th className="text-left font-medium p-3">Phases</th>
                    <th className="text-left font-medium p-3">Activity</th>
                    {weeks.map((w) => (
                      <th key={w} className="font-medium p-3 text-center">{w}</th>
                    ))}
                    <th className="p-3 w-20"></th>
                  </tr>
                </thead>
                <tbody>
                  {planGroups.map((group, gi) => (
                    <Fragment key={group.phase}>
                      {group.rows.map((r, idx) => (
                        <tr key={`${gi}-${idx}`} className="border-t">
                          {idx === 0 ? (
                            <td className="p-3 align-top font-medium text-slate-700" rowSpan={group.rows.length}>
                              {group.phase}
                            </td>
                          ) : null}
                          <td className="p-3 text-slate-700">{r.name}</td>
                          {weeks.map((_, i) => (
                            <td key={i} className="p-3">
                              {i + 1 >= r.start && i + 1 <= r.end ? (
                                <div className={`h-3 rounded-full ${r.color}`}></div>
                              ) : (
                                <div className="h-3"></div>
                              )}
                            </td>
                          ))}
                          <td className="p-3 w-20 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => addRow(gi, idx)}
                              className="inline-flex items-center justify-center size-8 rounded-full text-sky-600 hover:bg-sky-50"
                              aria-label="Add activity below"
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                            
                            <button
                              onClick={() => removeRow(gi, idx)}
                              className="inline-flex items-center justify-center size-8 rounded-full text-rose-600 hover:bg-rose-50"
                              aria-label="Delete activity"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </Fragment>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 flex justify-between">
              <Button asChild variant="outline" className="rounded-full">
                <Link to="/strategia-demo">Go Back</Link>
              </Button>
              <Button className="rounded-full" onClick={() => setTab("efforts")}>Next</Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="efforts">
          <div className="rounded-2xl border bg-white shadow-sm p-4 md:p-6">
            <h2 className="font-semibold text-slate-800 mb-4">Resources</h2>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Resources</TableHead>
                  {weeks.map((w, i) => (
                    <TableHead key={i} className="text-center">{w}</TableHead>
                  ))}
                  <TableHead className="text-center">Total Man Month</TableHead>
                  <TableHead className="w-20"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {effortRows.map((r, idx) => (
                  <TableRow key={`${r}-${idx}`}>
                    <TableCell className="font-medium">{r}</TableCell>
                    {weeks.map((_, i) => (
                      <TableCell key={i} className="text-center text-slate-700">
                        {(i + idx) % 3 === 0 ? 1.0 : 0.5}
                      </TableCell>
                    ))}
                    <TableCell className="text-center text-slate-700">{weeks.reduce((sum, _, i) => sum + (((i + idx) % 3 === 0 ? 1.0 : 0.5)), 0).toFixed(2)}</TableCell>
                    <TableCell className="text-right w-20">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => addEffortRow(idx)} className="inline-flex items-center justify-center size-8 rounded-full text-sky-600 hover:bg-sky-50" aria-label="Add resource row">
                        <Plus className="h-4 w-4" />
                      </button>
                      <button onClick={() => removeEffortRow(idx)} className="inline-flex items-center justify-center size-8 rounded-full text-rose-600 hover:bg-rose-50" aria-label="Delete resource row">
                        <Trash2 className="h-4 w-4" />
                      </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow className="bg-slate-50">
                  <TableCell className="font-semibold">Total</TableCell>
                  {weeks.map((_, i) => (
                    <TableCell key={i} className="text-center font-medium">{effortRows.reduce((sum, _, ridx) => sum + (((i + ridx) % 3 === 0 ? 1.0 : 0.5)), 0).toFixed(2)}</TableCell>
                  ))}
                  <TableCell className="text-center font-semibold">{weeks.reduce((weekSum, _, i) => weekSum + effortRows.reduce((sum, _, ridx) => sum + (((i + ridx) % 3 === 0 ? 1.0 : 0.5)), 0), 0).toFixed(2)}</TableCell>
                  <TableCell />
                </TableRow>
              </TableBody>
            </Table>
            <div className="mt-6 flex justify-between">
              <Button asChild variant="outline" className="rounded-full">
                <Link to="/strategia-demo">Go Back</Link>
              </Button>
              <Button className="rounded-full" onClick={() => setTab("cost")}>Next</Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="cost">
          <div className="rounded-2xl border bg-white shadow-sm p-4 md:p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="font-semibold text-slate-800">Resources</h2>
              <div className="flex items-center gap-2">
                <span className="text-sm text-slate-600">Total Price</span>
                <Select value={currency} onValueChange={setCurrency}>
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="Currency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="INR">INR</SelectItem>
                    <SelectItem value="USD">USD</SelectItem>
                    <SelectItem value="EUR">EUR</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="mt-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Resources</TableHead>
                    <TableHead className="text-center">Quantity</TableHead>
                    <TableHead className="text-center">Unit Price</TableHead>
                    <TableHead className="text-center">Total Months</TableHead>
                    <TableHead className="text-center">Total Price</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {costRows.map((r, idx) => (
                    <TableRow key={`${r.name}-${idx}`}>
                      <TableCell className="font-medium">{r.name}</TableCell>
                      <TableCell className="text-center">{String(r.qty).padStart(2, '0')}</TableCell>
                      <TableCell className="text-center">{r.unitPrice}</TableCell>
                      <TableCell className="text-center">{r.months.toFixed(2)}</TableCell>
                      <TableCell className="text-center">{(r.qty * r.unitPrice * r.months).toLocaleString()}</TableCell>
                    </TableRow>
                  ))}
                  <TableRow className="bg-slate-50">
                    <TableCell className="font-semibold">Total</TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell className="text-center font-semibold">{costRows.reduce((sum, r) => sum + r.qty * r.unitPrice * r.months, 0).toLocaleString()}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>

            <div className="mt-6 flex justify-between">
              <Button asChild variant="outline" className="rounded-full">
                <Link to="/strategia-demo">Go Back</Link>
              </Button>
              <Button className="rounded-full">
              <Link to="/strategia-demo">Save</Link>
                </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </Layout>
  );
}
