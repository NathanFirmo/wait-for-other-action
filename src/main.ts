import * as core from '@actions/core'
import * as github from '@actions/github'
import { Octokit } from '@octokit/rest'

async function run(): Promise<void> {
  const workflow: string = core.getInput('workflow', {
    required: true,
    trimWhitespace: true
  })

  const interval: number = +core.getInput('interval') * 1000 || 3000

  try {
    core.info(`Waiting until workflow ${workflow} ends`)

    let workflowIsRunning
    do {
      await new Promise(resolve => setTimeout(resolve, interval))
      workflowIsRunning = await checkIfWorkflowIsRunning(workflow)
    } while (workflowIsRunning)
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === 'Not Found') {
        core.error(
          `It seems the workflow "${workflow}" doesn't exist in current repo. Are this filename correct?`
        )
      }
      core.setFailed(error.message)
    }
  }
}

run()

async function checkIfWorkflowIsRunning(workflow: string): Promise<boolean> {
  const token: string = core.getInput('token', {
    required: true,
    trimWhitespace: true
  })

  const { context } = github

  const octokit = new Octokit({
    auth: token
  })

  const {
    data: { workflow_runs }
  } = await octokit.actions.listWorkflowRuns({
    owner: context.repo.owner,
    repo: context.repo.repo,
    workflow_id: workflow,
    per_page: 5
  })

  return workflow_runs.some(
    run => run.status === 'queued' || run.status === 'in_progress'
  )
}
