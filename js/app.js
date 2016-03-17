// es5, 6, and 7 polyfills, powered by babel
import polyfill from "babel-polyfill"

//
// fetch method, returns es6 promises
// if you uncomment 'universal-utils' below, you can comment out this line
import fetch from "isomorphic-fetch"

// universal utils: cache, fetch, store, resource, fetcher, router, vdom, etc
// import * as u from 'universal-utils'

// the following line, if uncommented, will enable browserify to push
// a changed fn to you, with source maps (reverse map from compiled
// code line # to source code line #), in realtime via websockets
// -- browserify-hmr having install issues right now
// if (module.hot) {
//     module.hot.accept()
//     module.hot.dispose(() => {
//         app()
//     })
// }

import DOM from 'react-dom'
import React, {Component} from 'react'

function app() {
    // start app
    // new Router()

    var ironData = {
      meta: {
         resultsCount: 100,
         perPage: 3,
      },
      results: [
         {
            title: "hot john",
            seller: "slickbag",
            price: "25 cents",
            descr: "this john is really hot and friendly",
            imgURL: "https://robohash.org/slickbag"
         },
         {
            title: "hot pockets",
            seller: "lean cuisine",
            price: "30 lbs of silver",
            descr: "these pockets are really hot and friendly",
            imgURL: "https://robohash.org/lean cuisine"
         },
         {
            title: "fingerless gloves",
            seller: "blind children",
            price: "$10",
            descr: "if you dont buy these you are evil",
            imgURL: "https://robohash.org/blind children"
         }
      ]
    }


   	var AppView = React.createClass({
	   	render: function(){
            console.log(this)
	   		return (
				<div className="pageContainer">
		   			<h1 className="headLine">Iron Etsy</h1>
		   			<AboutResults aboutData={this.props.shopData.meta}/>
		   			<ListingGrid listings={this.props.shopData.results}/>
		   		</div>
		   	)
	   	}
   })

   	var AboutResults = React.createClass({
   		render: function(){
            console.log("(metadata) function")
            console.log(this)
   			return (
   				<div className="About">
	   				<p className="nResults">total results {this.props.aboutData.resultsCount}</p>
	   				<p className="nShowing">of which showing {this.props.aboutData.perPage}</p>
   				</div>
   			)
   		}
   	})

   	var ListingGrid = React.createClass({

   		_getListingsJSX: function(listings){   				
            console.log("the JSX function")
   			console.log(listings)
            var newArray = []
            for (var i = 0; i < listings.length; i++) {
               var listingObj = listings[i]
               var component = <Listing listingData={listingObj}/>
               newArray.push(component)
            }
            return newArray
   		},

   		render: function(){
            console.log("====listingGrid function====")
            console.log(this)
            var itemListingsArray = this.props.listings
            console.log(itemListingsArray)
   			return(
	   			<div className="listingContainer">
	   				{/*this is how you comment*/}
					{this._getListingsJSX(itemListingsArray)}
	   			</div>
	   		)
   		}
   	})

   	var Listing = React.createClass({
   		render: function(){
            console.log("====listing function====")
            console.log(this)
            var shortCode = this.props.listingData
   			return (
   				<div className="listing">
   					<img src={this.props.listingData.imgURL}/>
                  <p className="title">title is: {shortCode.title}</p>
                  <p className="seller">seller is: {shortCode.seller}</p>
                  <p className="price">price is: ${shortCode.price}</p>
   					<p className="descr">description of product: {shortCode.descr}</p>
   				</div>
   			)
   		}
   	})

   DOM.render(<AppView shopData={ironData} />,document.querySelector('.container'))

}

app()
