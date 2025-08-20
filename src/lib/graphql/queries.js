import { GraphQLClient, gql } from "graphql-request";
import {getAccessToken} from "../auth.js";

const client = new GraphQLClient(
  'http://localhost:5000/graphql',
  {
    headers: () => {
      const accessToken = getAccessToken();
      if (accessToken) {
        return {
          'Authorization': `Bearer ${accessToken}`
        }
      }
      return {}
    }
  }
)

export async function getJob(id){
  const query = gql`
    query ($id: ID!) {
      job(id: $id) {
        id
        title,
        date,
        description,
        company {
          id
          name
        }
      }
    }
  `

  const data = await client.request(query, { id })
  return data.job;
}
export async function getJobs() {
  const query = gql`
    query {
      jobs {
        company {
          name
        }
        title
        date
        id
      }
    }
  `

  const data = await client.request(query)
  return data.jobs;
}


export async function getCompany(id){
  const query = gql`
      query ($id: ID!) {
        company(id: $id) {
          id
          name,
          description,
          jobs {
            id
            title
            date
          }
        }
      }
  `

  const data = await client.request(query, { id })
  return data.company;
}

export async function createJob(input) {
  const mutation = gql`
    mutation CreateJob($input: CreateJobInput!) {
        job: createJob(input: $input) {
            id
        }
    }
  `

  const data = await client.request(mutation, { input })
  return data.job;
}
