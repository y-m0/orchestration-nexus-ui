// Claude-Flow API service layer
// Update CLAUDE_FLOW_API_URL to match your Claude-Flow server
const CLAUDE_FLOW_API_URL = 'http://localhost:3001';

export async function getWorkflowStatus() {
  try {
    const res = await fetch(`${CLAUDE_FLOW_API_URL}/api/workflow/status`);
    if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
    return res.json();
  } catch (error) {
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error('Claude Flow service is not running or not accessible at ' + CLAUDE_FLOW_API_URL);
    }
    throw error;
  }
}

export async function triggerOrchestration(task: string) {
  try {
    const res = await fetch(`${CLAUDE_FLOW_API_URL}/api/hive-mind/spawn`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ task }),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
    return res.json();
  } catch (error) {
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error('Claude Flow service is not running or not accessible at ' + CLAUDE_FLOW_API_URL);
    }
    throw error;
  }
}

export async function getSecurityAnalysis() {
  try {
    const res = await fetch(`${CLAUDE_FLOW_API_URL}/api/github/gh-coordinator/analyze?analysis-type=security&target=./src`);
    if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
    return res.json();
  } catch (error) {
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error('Claude Flow service is not running or not accessible at ' + CLAUDE_FLOW_API_URL);
    }
    throw error;
  }
} 