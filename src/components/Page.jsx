import React from "react";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "../css/Page.css";
import { API, graphqlOperation } from 'aws-amplify';
import {
  getPage
} from "../graphql/queries"

function Page() {
  let { pageId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [pageData, setPageData] = useState(null);

  useEffect(() => {
    fetchPage();
    // eslint-disable-next-line
  }, []);

  async function fetchPage() {
    try {
      const result = await API.graphql(graphqlOperation(getPage, { id: pageId }));
      setPageData(result.data.getPage);
      setIsLoading(false);
    } catch (error) {
      console.log("error: ", error)
    }
  }

  return (
    <div className="page-body">
      {!isLoading &&
        <div>
          <Link to={"/" + pageData.username} >{pageData.username}</Link>
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