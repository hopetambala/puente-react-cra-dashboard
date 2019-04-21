import gql from "graphql-tag";

export const first_last_names = gql`
    query {
        getPeople{
            fname
            lname
        }
    }
`;