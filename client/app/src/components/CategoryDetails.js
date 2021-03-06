import React from 'react'
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import { Header,  Dimmer, Loader } from 'semantic-ui-react';
import ServiceList from './ServiceList';

function CategoryDetails({ data: { loading, error, tag } }) {
  if (loading)
    return (
      <p>Loading...</p>
    )

  if (error)
    return <p>{error.message}</p>

  // TODO: implement NotFound component
  // if (tag === null)
  //   return <NotFound />

  let serviceList = null;
  if (tag.services.length == 0)
    serviceList = <p>No places in this category!</p>
  else
    serviceList = <ServiceList services={tag.services} />

  return (
    <div className='category-details'>
      <Header as='h1'>#{tag.name}</Header>
      {serviceList}
    </div>
  );
}

const CategoryDetailsQuery = gql`
  query CategoryDetailsQuery($tagId: ID!) {
    tag(id: $tagId) {
      id
      name
      services {
        id
        name
        description
        location {
          address
        }
        tags {
          id
          name
        }
      }
    }
  }
`;

export default (graphql(CategoryDetailsQuery, {
  options(props) {
    return {
      variables: { tagId: props.match.params.tagId }
    }
  }
})(CategoryDetails));
