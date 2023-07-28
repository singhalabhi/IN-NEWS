import React, { Component } from 'react'
import Newscomponents from './newscomponents'
import Spinner from './spinner'
import InfiniteScroll from "react-infinite-scroll-component"
import PropTypes from 'prop-types'

export class News extends Component {
  // {status: 'ok', totalResults: 38, articles: Array(20)}
  // articles
  // : 
  // Array(20)
  // 0
  // : 
  // author
  // : 
  // "Priyank Tripathi"
  // content
  // : 
  // "Top News June 13, 2023: Cyclone Biparjoy Updates, Bhopal Building Fire, Parthala Bridge Opens"
  // description
  // : 
  // "Delhi fire today: The fire broke out at 12 pm today in a coaching institute named Sanskriti Coaching Centre. Seven fire tenders were pressed into service. Dramatic visuals from the area showed students jumping off from the third floor of the building of the c…"
  // publishedAt
  // : 
  // "2023-06-15T08:28:00Z"
  // source
  // : 
  // {id: null, name: 'Zoom'}
  // title
  // : 
  // "Delhi: Fire Engulfs Mukherjee Nagar Coaching Centre, Students Jump Off From Third Floor Of Burning Building | Video - Times Now"
  // url
  // : 
  // "https://www.timesnownews.com/delhi/fire-in-delhis-mukherjee-nagar-students-jump-off-from-third-floor-of-coaching-institute-video-article-101014005"
  // urlToImage
  // : 
  // "https://static.tnn.in/thumb/msid-101014005,updatedat-1686818971901,width-1280,height-720,resizemode-75/101014005.jpg"

  static defaultProps = {
    content: "general",
    pageSize: 15
  }
  static propTypes = {
    content: PropTypes.string,
    pageSize: PropTypes.number
  }


  constructor() {
    super();

    this.state = {

      articles: [],
      loading: false,
      page: 1,
      totalres: 0
    }



  }


  updatearticles = async () => {

    this.setState({ loading: true })
    let parseddata = await fetch(`https://newsapi.org/v2/top-headlines?country=in&category=${this.props.content}&apiKey=6936229a16c04f78a64d1945ddbd7ac8&page=${this.state.page}&pageSize=${this.props.pageSize}`);

    let data = await parseddata.json();

    this.setState({ articles: data.articles, loading: false, page: this.state.page, totalres: data.totalResults })

    console.log(data)


  }





  async componentDidMount() {
    //   this.setState({ loading: true})
    //   let parseddata= await fetch(`https://newsapi.org/v2/top-headlines?country=in&apiKey=6936229a16c04f78a64d1945ddbd7ac8&page=${this.state.page}&pageSize=10`);

    //   let data= await parseddata.json();

    //   this.setState({ articles: data.articles,loading: false,page:1,totalres: data.totalResults})
    //  console.log(data);
    await this.updatearticles();

  }

  handleprev = async () => {


    await this.setState({ page: this.state.page - 1 });
    // this.setState({ loading: true})
    // let parseddata= await fetch(`https://newsapi.org/v2/top-headlines?country=in&apiKey=6936229a16c04f78a64d1945ddbd7ac8&page=${this.state.page-1}&pageSize=10`);

    // let data= await parseddata.json();

    // this.setState({ articles: data.articles,loading: false,page:this.state.page-1})


    this.updatearticles();



  }
  handlenext = async () => {

    await this.setState({ page: this.state.page + 1 });
    // this.setState({ loading: true})

    // let parseddata= await fetch(`https://newsapi.org/v2/top-headlines?country=in&apiKey=6936229a16c04f78a64d1945ddbd7ac8&page=${this.state.page+1}&pageSize=10`);

    // let data= await parseddata.json();

    // this.setState({ articles: data.articles,loading: false,page:this.state.page+1})

    this.updatearticles();



  }

 fatchdata= async ()=>{

  this.setState({ loading: true })
  let parseddata = await fetch(`https://newsapi.org/v2/top-headlines?country=in&category=${this.props.content}&apiKey=6936229a16c04f78a64d1945ddbd7ac8&page=${this.state.page+1}&pageSize=${this.props.pageSize}`);

  let data = await parseddata.json();

  this.setState({ articles:this.state.articles.concat(data.articles), loading: false, page: this.state.page+1, totalres: data.totalResults })


 }



  render() {
    return (
      <>
    
        <h2 className="text-center">TOP-{this.props.content.toUpperCase()} HEADLINES</h2>
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fatchdata}
          hasMore={Math.ceil(this.state.totalres/this.props.pageSize)!==this.state.page}
          loader={<Spinner/>}
        ><div className="container">
          <div className="row ">
            {this.state.articles.map((element) => {
              return <div className="col-md-4"><Newscomponents title={element.title} description={element.description} url={element.url} author={element.author} publishedAt={element.publishedAt} imageurl={element.urlToImage} /></div>
            })}</div></div>
        </InfiniteScroll>
      
      </>
      // {/* <div className="d-flex justify-content-between">
      //    <button disabled={this.state.page<=1}type="button" onClick={this.handleprev} className="btn btn-dark">Previous</button>
      // <button type="button" disabled={Math.ceil(this.state.totalres/this.props.pageSize)===this.state.page} onClick={this.handlenext} className="btn btn-dark">Next</button>
      // </div>
      // */}


    )
  }
}
