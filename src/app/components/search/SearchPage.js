/**
* Created by Cyferouss on 2017-03-22.
*/

import React from 'react'
import 'bootstrap/less/bootstrap.less';
import style from './style.css';

import {
  Grid, 
  PageHeader, 
  Panel, 
  FormControl, 
  FormGroup, 
  Form, 
  Col, 
  Row, 
  Button, 
  ControlLabel, 
  HelpBlock, 
  ButtonToolbar,
  Checkbox,
  Image, 
  Media,
  Well} from 'react-bootstrap';
import {IndexLink, browserHistory} from 'react-router';

import utils from '../Utils'

export default class SearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: []
    };

  }

  componentDidMount() {
    console.log("SEARCHPAGE: DID MOUNT");
    window.scrollTo(0,0)
  }

  /**
   * In this function, all results will be rendered to the searchResults array
   * defined in states.
   *
   * Convention:
   * Odd Product - tile
   * Even Product - Pink
   * Project - default color scheme (grey-ish)
   */
  Callback(results) {
    let resultPool = [];
    let clock = 0;
    if (!results || results.length == 0) {
      console.log("[SearchPage] No result!");
      resultPool.push(
        <ControlLabel> No result... </ControlLabel>
      )
    } else {
      console.log(results);
      results.map( (element) => {
        clock++;
        let currElementUrl =  '/product?pID=' + element.pID;
        console.log(currElementUrl);
        //if (element.type == 'project') {
          /*
          resultPool.push(
            <Well key={clock}>
              <Media>
                <Media.Left>
                  <Button bsStyle="primary" onClick={() => browserHistory.push(currElementUrl)}>
                    Check Out!
                  </Button>
                </Media.Left>
                <Media.Body>
                  <Media.Heading>
                    {element.title}
                  </Media.Heading>
                  <p>
                    {element.description}
                  </p>
                </Media.Body>
                <Media.Right>
                  <i>id.<u>{element.id}</u></i>
                </Media.Right>
              </Media>
            </Well>
          )
          */
       if (clock % 2) {
        resultPool.push(
            <Well id={style.EvenResults} key={clock}>
                <Media>
                  <Media.Left>
                    <Image width={128} height={72} src={element.imageURL} alt="Result" />
                  </Media.Left>
                  <Media.Body>
                    <Media.Heading>{element.name}</Media.Heading>
                    <p>{element.description}</p>
                  </Media.Body>
                  <Media.Right>
                    <Button onClick={() => browserHistory.push(currElementUrl)}>View</Button>
                    <br />
                    <br />
                    <i>id.<u>{element.pID}</u></i>
                  </Media.Right>
                </Media>
              </Well>
        )
       }
        //}
        else {
          resultPool.push(
            <Well id={style.OddResults} key={clock}>
              <Media>
                <Media.Left>
                  <Image width={128} height={72} src={element.imageURL} alt="Result" />
                </Media.Left>
                <Media.Body>
                  <Media.Heading>{element.name}</Media.Heading>
                  <p>{element.description}</p>
                </Media.Body>
                <Media.Right>
                  <Button onClick={() => browserHistory.push(currElementUrl)}>View</Button>
                  <br />
                  <br />
                  <i>id.<u>{element.pID}</u></i>
                </Media.Right>
              </Media>
            </Well>
          )
        }
      })
    }
      
    this.setState({
      searchResults: resultPool
    })
  }

  render() {
    let input = undefined;

    let searchCall = () => {
      console.log("QUERY STRING: " + input.value)
      this.setState({
        searchResults: []
      });
      utils.fetchJSON(
        '/api/product/'+input.value,
        (json) => {
          this.Callback(json)
        }
      )
    };

    return(
      <Grid>
        <Row>
          <PageHeader> Search for Projects and Products </PageHeader>
        </Row>

        <Row>
          <Form inline>
            <FormGroup>
              <ControlLabel>Search For</ControlLabel>
              {' '}
              <FormControl type="text" id={style.Expanded} placeholder="Name of project or artwork..." inputRef={(ref) => {input = ref;}} />
            </FormGroup>
            {' '}
            <Button onClick={searchCall}> Search </Button>
          </Form>
        </Row>
        <hr/>
        <Row id={style.Margined}>
          <Panel header='Additional Options'>
            <FormGroup>
              <ControlLabel> Match To:</ControlLabel> {' '}
              <Checkbox inline> Author </Checkbox> {' '}
              <Checkbox inline> Description </Checkbox> {' '}
              <Checkbox inline> Collaborators </Checkbox> {' '}
              <br />
              <i>note: this function is not implemented</i>
            </FormGroup>
          </Panel>
        </Row>
        {this.state.searchResults}
        
      </Grid>
    )
  }
}
