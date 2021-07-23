import React, { useState } from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Alert from "@material-ui/lab/Alert";
import styled from "styled-components";
import { Link, BrowserRouter as Router } from "react-router-dom";
import SERVER_URL from "./../utilities/constants";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& > *": {
        margin: theme.spacing(2),
      },
    },
  })
);

interface Report {
  1: number;
  2: number;
  3: number;
  4: number;
}

interface ComponentState {
  link: string;
  reportStats: Report;
}

const initialState = {
  link: "",
  reportStats: {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
  },
};

const Home = () => {
  const classes = useStyles();
  const [isLoading, setLoading] = useState<boolean>(false);
  const [showReport, setShowReport] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [report, setReport] = useState<ComponentState>(initialState);

  const handleLoading = () => setLoading((prevState: boolean) => !prevState);

  const handleGenerateButton = async () => {
    const url = `${SERVER_URL}generate-pdf`;
    try {
      handleLoading();
      const response = await fetch(url);
      const res = await response.json();
      const { report, link } = res;
      console.log(report, link);
      setReport((preState: ComponentState) => ({
        ...preState,
        link,
        reportStats: report,
      }));
      handleLoading();
    } catch (error) {
      setError(true);
      console.log(error);
      handleLoading();
    }
  };

  const handleShowReport = () =>
    setShowReport((prevState: boolean) => !prevState);

  const { reportStats, link } = report;
  const reportUrl = `${SERVER_URL}${link}`;

  const openUrlInNewTab = () => {
    const win = window.open(reportUrl, "_blank");
    if (win) win.focus();
  };

  const generateReport = () =>
    reportStats["1"] ||
    reportStats["2"] ||
    reportStats["3"] ||
    reportStats["4"] ? (
      <>
        <Button color="primary" onClick={handleShowReport} variant="contained">
          Report
        </Button>
        {showReport && (
          <div>
            <p>
              AlphaBetical Strings: <Span>{reportStats["1"]}</Span>
            </p>
            <p>
              Real Numbers: <Span>{reportStats["2"]}</Span>
            </p>
            <p>
              Integers: <Span>{reportStats["3"]}</Span>
            </p>
            <p>
              AlphaNumerics: <Span>{reportStats["1"]}</Span>
            </p>
          </div>
        )}
      </>
    ) : undefined;

  return (
    <Container>
      <Router>
        <Content className={classes.root}>
          {error && (
            <Alert severity="error">
              Something went wrong on server side.!
            </Alert>
          )}
          {isLoading && (
            <SpinnerContainer>
              <CircularProgress />
            </SpinnerContainer>
          )}

          <Button
            color="primary"
            onClick={handleGenerateButton}
            variant="contained"
          >
            Generate
          </Button>
          {link && (
            <ReportLink>
              <p>Link:</p>
              <ExtendedLink to="#" onClick={openUrlInNewTab}>
                {reportUrl}
              </ExtendedLink>
            </ReportLink>
          )}
          {generateReport()}
        </Content>
      </Router>
    </Container>
  );
};

const Container = styled.div`
  border-radius: 10px;
  box-shadow: 5px 10px 20px #888888;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  position: relative;
  width: 30%;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

const ExtendedLink = styled(Link)`
  color: #2596be;
  text-align: center;
`;

const Span = styled.span`
  font-size: 20px;
  font-weight: bold;
`;

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 10px 0px;
  width: 100%;
`;

const ReportLink = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

export default Home;
