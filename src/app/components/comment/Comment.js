
import React from 'react';
import style from './style.css';

import 'bootstrap/less/bootstrap.less';
import Jumbotron from 'react-bootstrap/lib/Jumbotron';
import Grid from 'react-bootstrap/lib/Grid';
import Button from 'react-bootstrap/lib/Button';
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup';
import DropdownButton from 'react-bootstrap/lib/DropdownButton';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Carousel from 'react-bootstrap/lib/Carousel';
import Image from 'react-bootstrap/lib/Image';
import Thumbnail from 'react-bootstrap/lib/Thumbnail';
import PageHeader from 'react-bootstrap/lib/PageHeader';
import Panel from 'react-bootstrap/lib/Panel';
import {browserHistory} from 'react-router'
import utils from '../Utils';

import megpoidgumi from '../megpoidgumi.png';
import dummyb1p1 from '../dummyb1p1.jpeg';
import dummyb1p2 from '../dummyb1p2.jpeg';
import dummyb1p3 from '../dummyb1p3.jpeg';
import dummyb1p4 from '../dummyb1p4.jpeg';
import dummyb2p1 from '../dummyb2p1.jpeg';


export default class Comment extends React.Component {

	constructor(props) {
		super(props)
       this.state = {
            commentIssued: '',
            content:'',
            type: '',

        };
	}

	componentDidMount() {
		console.log("[Product]: DID MOUNT")
		window.scrollTo(0, 0)
	}


	_handleComment(json) {
		if (json.err) {
			// redirect to error page
		} else {
			this.setState({
				commentIssued: json.commentIssued,
				content: json.content,
				type: json.type
			})
		}
	}


	render() {

		/**
		 * Remember: Fix the attributes below.
		 *
		 * Right now the page is designed to accept image names, which
		 * is not the case in production.
		 *
		 * Essentially on RENDER, "props.params.id" will contain the pid
		 *
		 * One needs to fetchJSON to get the actual image and the address.
		 *
		 * SET THESE FIELDS BELOW ACCORDINGLY!
		 */

		utils.fetchJSON(
		 	'/api/product?pid=10086',
		 	(json) => this._handleComment(json)
		 )


		return (
			<Grid>
				<Col md={8}>
					<Panel header="User 1" id={style.Margined}>
						<p>
							First comment
						</p>
						<p>
							Type:
						</p>
						<p>
							Date issued: Mar 28
						</p>
					</Panel>

					<Panel header="User 2" id={style.Margined}>
						<p>
							Second comment
						</p>
						<p>
							Type:
						</p>
						<p>
							Date issued: Mar 28
						</p>
					</Panel>
					<Panel header="User 3" id={style.Margined}>
						<p>
							Third comment
						</p>
					</Panel>
				</Col>
			</Grid>
		)
	}
}
