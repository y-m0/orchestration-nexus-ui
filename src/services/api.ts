import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'

// Base URL for the API
// In production, this would be the actual deployed URL of the DataSummarizationAgent
const API_BASE_URL = import.meta.env.VITE_API_URL || '/api'

// Interface for the summarization request
interface SummarizeRequest {
  task_id: string
  payload: {
    text_input: string
  }
}

// Interface for the summarization response
interface SummarizeResponse {
  task_id: string
  status: 'completed' | 'failed'
  result?: {
    summary_output: string
  }
  error?: {
    code: string
    message: string
  }
}