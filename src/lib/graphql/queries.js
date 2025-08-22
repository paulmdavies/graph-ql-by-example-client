import {ApolloClient, ApolloLink, concat, createHttpLink, gql, InMemoryCache} from "@apollo/client";
import {getAccessToken} from "../auth.js";

const httpLink = createHttpLink({uri: 'http://localhost:5000/graphql'})

const authLink = new ApolloLink((operation, forward) => {
  const accessToken = getAccessToken();
  if (accessToken) {
    operation.setContext({
      headers: {'Authorization': `Bearer ${accessToken}`}
    })
  }

  return forward(operation)
});

export const apolloClient = new ApolloClient(
  {
    link: concat(authLink, httpLink),
    cache: new InMemoryCache(),
  }
)

const jobDetailFragment = gql`
    fragment JobDetail on Job {
        id
        title
        date
        description
        company {
            id
            name
        }
    }
`

export const jobByIdQuery = gql`
    query Job ($id: ID!) {
        job(id: $id) {
            ...JobDetail
        }
    },
    ${jobDetailFragment}
`;

export const jobsQuery = gql`
    query Jobs($limit: Int, $offset: Int) {
        jobs(limit: $limit, offset: $offset) {
            items {
                company {
                    id
                    name
                }
                title
                date
                id
            }
            totalCount
        }
    }
`;

export const companyByIdQuery = gql`
    query CompanyById ($id: ID!) {
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
`;

export const createJobMutation = gql`
      mutation CreateJob($input: CreateJobInput!) {
          job: createJob(input: $input) {
              ...JobDetail
          }
      }
      ${jobDetailFragment}
  `;
