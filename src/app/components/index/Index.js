import React from 'react';
import style from './style.css';
import 'bootstrap/less/bootstrap.less';
import Jumbotron from 'react-bootstrap/lib/Jumbotron';
import Grid from 'react-bootstrap/lib/Grid';
import Button from 'react-bootstrap/lib/Button';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Carousel from 'react-bootstrap/lib/Carousel';
import Image from 'react-bootstrap/lib/Image';
import Thumbnail from 'react-bootstrap/lib/Thumbnail';
import {browserHistory} from 'react-router'

import megpoidgumi from '../megpoidgumi.png';
import dummyb1p1 from '../dummyb1p1.jpeg';
import dummyb1p2 from '../dummyb1p2.jpeg';
import dummyb1p3 from '../dummyb1p3.jpeg';
import dummyb1p4 from '../dummyb1p4.jpeg';
import dummyb2p1 from '../dummyb2p1.jpeg';
import dummy_graph_old from '../dummy_graph_old.jpg';
import dummy_graph_new from '../dummy_graph_new.jpg';

export default class Index extends React.Component {

	constructor(props) {
		super(props)
	}

	componentDidMount() {
		console.log("[Index]: DID MOUNT")
		window.scrollTo(0, 0)
	}

	render() {

		/**
		 * NOTE: We must fix the image display inside Carousel, maybe
		 * use ResponsiveEmbed.
		 * 
		 * Or we constraint the image inside Carousel to be all 1336x768
		 * and we don't need to handle this stuff... it is valid since 
		 * a slideshow should look nice.
		 *
		 * Upon automation, all imgsrc, number of slides (this can be generated)
		 * using loop, featured stuff should be returned and fetched from the 
		 * backend.
		 */

		return (
			<div>
				<Jumbotron>
					<Grid>
						<Row>
							<Col md={12}>
								<h1>Art Collaboration Platform</h1>
							</Col>
						</Row>

						<Row>
							<Col md={4}>
								<h2>Heading</h2>
								<p>Adipisicing ratione incidunt eaque expedita rerum porro inventore. Nihil sit ipsam iure officiis sit eos at quibusdam natus dignissimos natus dolore! Vel doloremque ipsa alias nihil harum laborum necessitatibus rerum?</p>
								<p><Button>View details »</Button></p>
							</Col>
							<Col md={8}>
								<Carousel>
									<Carousel.Item>
										<Image id="SlideShowImage" alt="900x500" src={megpoidgumi}/>
										<Carousel.Caption>
											<h3>Most Viewed Piece</h3>
											<p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
										</Carousel.Caption>
									</Carousel.Item>
									<Carousel.Item>
										<Image id="SlideShowImage" alt="900x500" src={megpoidgumi}/>
										<Carousel.Caption>
											<h3>Second slide label</h3>
											<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
										</Carousel.Caption>
									</Carousel.Item>
									<Carousel.Item>
										<Image id="SlideShowImage" alt="900x500" src={megpoidgumi}/>
										<Carousel.Caption>
											<h3>Third slide label</h3>
											<p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
										</Carousel.Caption>
									</Carousel.Item>
								</Carousel>
							</Col>
						</Row>
					</Grid>
				</Jumbotron>
				<Grid>
					<Row>
						<Col md={8}>
							<h1>Prompted</h1>
							<p>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
							</p>
						</Col>
						<Col md={4}>
							<h1>Featured</h1>
							<p>
								Artists are respected and their work will be nominated to be displayed on the homepage.
							</p>
  							<Thumbnail onClick={() => browserHistory.push('/product')} alt="171x180" src={megpoidgumi} />
							<Thumbnail onClick={() => browserHistory.push('/product/dummyb1p4')} alt="171x180" src={dummyb1p4} />
						</Col>
					</Row>
					<Row>
						<Col md={4}>
							<h3>Catagory 1</h3>
							<p>
								Nulla nunc,
							</p>
						</Col>
						<Col md={4}>
							<h3>Catagory 2</h3>
							<p>
								Amet orci vel
							</p>
						</Col>
						<Col md={4}>
							<h3>Catagory n</h3>
							<p>
								Ac dolor suspendisse id lacus eu ullamcorper,
							</p>
						</Col>
					</Row>
				</Grid>
			</div>
		)
	}
}
