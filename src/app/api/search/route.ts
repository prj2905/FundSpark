import { NextRequest, NextResponse } from 'next/server';
import projects from '@/app/components/Data/crowdfunding_projects.json'; 

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get('query')?.toLowerCase() || '';

  const filtered = projects.filter(project =>
    project.name.toLowerCase().includes(query) ||
    project.description.toLowerCase().includes(query) ||
    project.category.toLowerCase().includes(query)
  );

  return NextResponse.json({ projects: filtered });
}
