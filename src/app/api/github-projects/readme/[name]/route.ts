import { NextResponse } from 'next/server';

// Cache control helper
function setCacheHeaders(response: NextResponse, maxAge: number = 86400) {
  response.headers.set('Cache-Control', `public, max-age=${maxAge}, stale-while-revalidate=300`);
  return response;
}

export async function GET(
  request: Request,
  context: { params: Promise<{ name: string }> }
) {
  const token = process.env.GITHUB_TOKEN;
  const { name: repoName } = await context.params;
  
  if (!token) {
    return NextResponse.json(
      { error: 'GitHub token not configured' },
      { status: 500 }
    );
  }

  try {
    // Fetch README from GitHub API
    const response = await fetch(
      `https://api.github.com/repos/josuejero/${repoName}/readme`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/vnd.github.v3+json',
        },
      }
    );

    if (!response.ok) {
      // If no README exists, return empty
      const emptyResponse = NextResponse.json({
        excerpt: '',
        html: '',
        path: '',
        repo: repoName,
        lastFetched: new Date().toISOString(),
      });
      return setCacheHeaders(emptyResponse, 3600); // Cache 404 for 1 hour
    }

    const data = await response.json();
    
    // Decode base64 content
    const content = atob(data.content);
    
    // Extract first paragraph (text up to first double newline)
    const excerpt = content
      .split('\n\n')[0] // Get first paragraph
      .replace(/[#*`]/g, '') // Remove markdown formatting
      .substring(0, 200) // Limit length
      .trim();

    const result = {
      repo: repoName,
      path: data.path,
      excerpt,
      html: data.html_url,
      lastFetched: new Date().toISOString(),
    };

    const nextResponse = NextResponse.json(result);
    return setCacheHeaders(nextResponse, 86400); // 24 hour cache for READMEs
  } catch (error) {
    console.error('Error fetching README:', error);
    
    // Return empty result on error
    const errorResponse = NextResponse.json({
      excerpt: '',
      html: '',
      path: '',
      repo: repoName,
      lastFetched: new Date().toISOString(),
    });
    return setCacheHeaders(errorResponse, 300); // 5 minute cache on error
  }
}