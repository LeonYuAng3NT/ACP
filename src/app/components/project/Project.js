import React from 'react';
import style from './style.css';
import 'bootstrap/less/bootstrap.less';
import Jumbotron from 'react-bootstrap/lib/Jumbotron';
import Grid from 'react-bootstrap/lib/Grid';
import Button from 'react-bootstrap/lib/Button';
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup';
import DropdownButton from 'react-bootstrap/lib/DropdownButton';
import Tooltip from 'react-bootstrap/lib/Tooltip';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

import Thumbnail from 'react-bootstrap/lib/Thumbnail';
import PageHeader from 'react-bootstrap/lib/PageHeader';
import Panel from 'react-bootstrap/lib/Panel';

import {browserHistory} from 'react-router';


const tooltip = (
	<Tooltip id="tooltip">This is the picture of<strong> MegpoId</strong> .</Tooltip>
);

import megpoidgumi from '../megpoidgumi.png';
import dummyb1p1 from '../dummyb1p1.jpeg';
import dummyb1p2 from '../dummyb1p2.jpeg';
import dummyb1p3 from '../dummyb1p3.jpeg';
import dummyb1p4 from '../dummyb1p4.jpeg';
import dummyb2p1 from '../dummyb2p1.jpeg';
import dummy_graph_old from '../dummy_graph_old.jpg';
import dummy_graph_new from '../dummy_graph_new.jpg';

export default class Project extends React.Component {
	constructor(props){
		super(props);

		this.state = {
      nodes:null,
      massage:'',
      images: [],
      list:null,
      track:1,
      j:0
    }
		if (!props.params.id) {  /* Set default to megpoid gumi*/
			this.state.project_id = 'megpoidgumi'
		} else if (props.params.id == 'dummy_old') {
			this.state.project_id = 'dummy_old'
		} else if (props.params.id == 'dummy_new') {
			this.state.project_id = 'dummy_new'
		} else {  /* Assign default */
			this.state.project_id = 'megpoidgumi'
		}
	}

	successor(name){
    var successor = [];
    for (i = 0; i < this.state.list.length; i++) {
      if(this.state.list[i].parent === name){
        var removed = this.state.list.splice(i,1);
        successor.push(removed);
        this.state.images[this.state.j].push(removed.imageURL);
      }
    }
    return successor;
  }

  bfs(root){
    var fifo = [root];
    while(fifo.length < 1){
      var current = fifo.splice(0,1);
      var successor = this.successor(current.parent);
      fifo.push(successor);
      this.state.j = this.state.j+1;
    }
  }



	render() {
		let project = "P1"; // find a way to replace it
		let callback = (data) =>{
      this.setState({massage: data.massage});
      if(data.error == true){
        return;
      }
      else if(data.isroot){
        this.setState({images: [data.root.imageURL]});
      }
      else{
        this.state.images.push([]);
        this.state.images[0].push(data.root.imageURL);
        for (i = 0; i < data.nodes.length; i++){
          this.state.images.push([]);
        }
        this.setState({list: data.nodes});
        this.bfs(data.root);

      }
    }
		let fire = () => utils.sendJSON('/api/login',{name: project},callback);
		if (this.state.project_id == 'megpoidgumi') {
			panel_list_view = (
				<Grid>
					<Row className="show-grid">
						<Col sm={3} md={2}><Thumbnail src={megpoidgumi} /></Col>
					</Row>
				</Grid>
			)
		} else if (this.state.project_id == 'dummy_old') {
			panel_list_view = (
				<Grid>
					<Row className="show-grid">
						<Col sm={3} md={2}><Thumbnail src={dummyb1p4} /></Col>
						<Col sm={3} md={2}><Thumbnail src={dummyb1p3} /></Col>
						<Col sm={3} md={2}><Thumbnail src={dummyb1p2} /></Col>
					</Row>
					<Row className="show-grid">
						<Col sm={3} md={2}><Thumbnail src={dummyb1p1} /></Col>
					</Row>
				</Grid>
			)
		} else {
			panel_list_view = (
				<Grid>
					<Row className="show-grid">
						<Col sm={3} md={2}><Thumbnail src={dummyb2p1} /></Col>
						<Col sm={3} md={2}><Thumbnail src={dummyb1p4} /></Col>
						<Col sm={3} md={2}><Thumbnail src={dummyb1p3} /></Col>
					</Row>
					<Row className="show-grid">
						<Col sm={3} md={2}><Thumbnail src={dummyb1p2} /></Col>
						<Col sm={3} md={2}><Thumbnail src={dummyb1p1} /></Col>
					</Row>
				</Grid>
			)
		}

		let panel_tree_view;
		if (this.state.project_id == 'dummy_old') {
			panel_tree_view = <Thumbnail src={dummy_graph_old} />
		} else if (this.state.project_id == 'dummy_new') {
			panel_tree_view = <Thumbnail src={dummy_graph_new} />
		} else {
			panel_tree_view = <Thumbnail src={megpoidgumi} />
		}

		let panel_view;
		if (this.state.panel_view == 'list') {
			panel_view = panel_list_view
		} else {
			panel_view = panel_tree_view
		}

		return (
			<div>
				<Grid>
					<PageHeader>Project Name</PageHeader>
					<Col md={4}>
						<Panel header="Info">
							<p>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
							</p>
						</Panel>
						<Panel header="Collaborators">
							<p> Cyferouss </p>
							<p> Yanboding </p>
							<p> MXKLZL </p>
						</Panel>
						<Panel header="Statstics">
							<p> Visitors : 135 </p>
							<p> Commits: 4 </p>
							<p> Branches: 2 </p>
							<p> Etc... </p>
						</Panel>
					</Col>

					<Col md={8}>
						<ButtonGroup justified>
							<ButtonGroup justified>
								<DropdownButton bsStyle = 'success' title="View" id="bg-justified-dropdown">
									<MenuItem eventKey="1" onClick={() => this.setState({panel_view: 'tree'})} >Tree View</MenuItem>
									<MenuItem eventKey="2" onClick={() => this.setState({panel_view: 'list'})} >List View</MenuItem>
								</DropdownButton>
							</ButtonGroup>
							<ButtonGroup>
								<Button bsStyle = 'warning' onClick={() => browserHistory.push('/requests')}>Pending Requests</Button>
							</ButtonGroup>
							<ButtonGroup>
								<Button bsStyle = 'info'> History </Button>
							</ButtonGroup>
						</ButtonGroup>
						<Panel>

							{panel_view}
							<OverlayTrigger placement="top" overlay={tooltip}>
								<Button bsStyle="default">Check for details</Button>
							</OverlayTrigger>
						</Panel>
					</Col>
				</Grid>
			</div>
		)
	}
}
