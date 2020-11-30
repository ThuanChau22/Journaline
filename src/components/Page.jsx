import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { API, graphqlOperation } from 'aws-amplify';
import {
  getPage
} from "../graphql/queries"

function Page() {
  let { pageid } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [pageData, setPageData] = useState(null);

  useEffect(() => {
    fetchPage();
    // eslint-disable-next-line
  }, []);

  async function fetchPage() {
    try {
      const result = await API.graphql(graphqlOperation(getPage, { id: pageid }));
      setPageData(result.data.getPage);
      setIsLoading(false);
    } catch (error) {
      console.log("error: ", error)
    }
  }

  return (
    <div>
      {!isLoading &&
        <div>
          <p>Title: {pageData.title}</p>
          <p>Status: {pageData.status}</p>
          <p>Content: {pageData.content}</p>
          <p>CreatedAt: {pageData.createdAt}</p>
        </div>
      }
    </div>
  );
}

export default Page;