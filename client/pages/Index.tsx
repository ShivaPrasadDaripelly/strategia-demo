import { Link, useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { useMemo } from "react";

const sampleProjects = [
  { id: "p1", code: "P1", name: "Project 1" },
  { id: "p2", code: "P2", name: "Project 2" },
  { id: "p3", code: "P3", name: "Project 3" },
];

export default function Index() {
  const navigate = useNavigate();

  const ProjectCard = useMemo(
    () =>
      function ProjectCard({ id, code, name }: { id: string; code: string; name: string }) {
        return (
          <button
            onClick={() => navigate(`/setup`) }
            className="group w-44 h-40 rounded-xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition-all grid grid-rows-[1fr_auto] overflow-hidden"
          >
            <div className="flex items-center justify-center">
              <div className="size-14 rounded-full grid place-items-center bg-gradient-to-br from-sky-400 to-indigo-500 text-white text-xl font-bold shadow-inner">
                {code}
              </div>
            </div>
            <div className="px-4 py-3 text-left text-sm text-slate-600 border-t">{name}</div>
          </button>
        );
      },
    [navigate],
  );

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-slate-800">Dashboard</h1>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-7 gap-6" >
          <Link
            to="/setup?new=1"
            className="w-44 h-40 rounded-xl border-2 border-dashed border-slate-300 bg-white/70 hover:border-sky-400 hover:bg-sky-50/40 transition-all grid grid-rows-[1fr_auto]"
          >
            <div className="flex items-center justify-center">
              <div className="size-14 rounded-full grid place-items-center bg-slate-100 text-slate-500 text-2xl font-bold border border-slate-200">
                +
              </div>
            </div>
            <div className="px-4 py-3 text-left text-sm text-slate-600">Add New Project</div>
          </Link>

          {sampleProjects.map((p) => (
            <ProjectCard key={p.id} id={p.id} code={p.code} name={p.name} />
          ))}
        </div>

        {/* <div className="rounded-xl border bg-white shadow-sm p-6">
          <h2 className="text-lg font-semibold text-slate-800 mb-2">Get Started</h2>
          <p className="text-slate-600 mb-4 max-w-2xl">
            Create a project to generate a detailed plan with phases, timelines, team allocation and cost estimates.
          </p>
          <Button className="rounded-full bg-gradient-to-r from-sky-500 to-indigo-600 text-white hover:from-sky-600 hover:to-indigo-600">
            <Link to="/setup?new=1">Create Project</Link>
          </Button>
        </div> */}
      </div>
    </Layout>
  );
}
