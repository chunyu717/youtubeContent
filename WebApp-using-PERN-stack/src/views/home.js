import React, { Component } from 'react';

class Home extends Component{
    render() {
        return (
            // <div className="container">
            //         <div id="carousel-example-generic" className="carousel slide">
            //             <div className="carousel-inner">
            //                 <div className="carousel-item active">
            //                     <img className = "img-responsive img-rounded" style={{width: '100%'}} src = "data:image/jpeg;base64,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" alt = "" />
            //                 </div>
            //                 <div className="carousel-item">
            //                     <img className = "img-responsive img-full" style={{width: '100%'}} src = "/img/slide-1.jpg" alt = "" />
            //                 </div>
            //                 <div className="carousel-item">
            //                     <img className = "img-responsive img-full" style={{width: '100%'}} src = "img/slide-2.jpg" alt = "" />
            //                 </div>
            //             </div>
            //             <a className="carousel-control-prev" href="#carousel-example-generic" role="button" data-slide="prev">
            //                 <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            //                 <span className="sr-only">Previous</span>
            //             </a>
            //             <a className="carousel-control-next" href="#carousel-example-generic" role="button" data-slide="next">
            //                 <span className="carousel-control-next-icon" aria-hidden="true"></span>
            //                 <span className="sr-only">Next</span>
            //             </a>
            //         </div>
            // </div>
            <div>
                <header className="masthead text-center text-white" style= {{ zIndex: '-1'} }>
                    <div className="masthead-content">
                    <div className="container">
                        <h1 className="masthead-heading mb-0">One Page Wonder</h1>
                        <h2 className="masthead-subheading mb-0">Will Rock Your Socks Off</h2>
                    </div>
                    </div>
                    <div className="bg-circle-1 bg-circle"></div>
                    <div className="bg-circle-2 bg-circle"></div>
                    <div className="bg-circle-3 bg-circle"></div>
                    <div className="bg-circle-4 bg-circle"></div>
                </header>
                
                <section>
                    <div id="about" data-matching-link="#about-link" className="container">
                        <div className="row align-items-center">
                            <div className="col-lg-6 order-lg-2">
                            <div className="p-5">
                                <img className="img-fluid rounded-circle" src="img/02.jpg" alt="" />
                            </div>
                            </div>
                            <div className="col-lg-6 order-lg-1">
                                <div className="p-5">
                                    <h2 className="display-4">關於楊峻科技...</h2>
                                    <p style={{fontSize: '20px'}}>高雄相遇婚禮企劃 / 顧問團隊(全台服務)</p>
                                    <p style={{fontSize: '20px'}}>高婚禮企劃主持 / 婚禮樂團 / 婚禮統籌 / 婚禮諮詢</p>
                                    <p style={{fontSize: '20px'}}>聆聽屬於您們的相遇故事 </p>
                                    <p style={{fontSize: '20px'}}>見證您們獨一無二的愛情</p>
                                    <p style={{fontSize: '20px'}}>將這份感動融入在婚禮當中</p>
                                    <p style={{fontSize: '20px'}}>將這份情感傳遞給每一位參與這場盛宴的朋友</p>
                                    <p style={{fontSize: '20px'}}>相遇婚禮 為您們人生最重要的一刻化作永恆的回憶</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section>
                    <div id="member" data-matching-link="#member-link" className="container">
                        <div className="row justify-content-md-center">
                            <div className="col-lg-12">
                                <hr/>
                                <h2 className="intro-text text-center">Our
                                    <strong> CEO & Co-Funder </strong>
                                </h2>
                                <hr/>
                            </div>
                            {/* <div className="col-md-5 text-center">
                                <img className = "img-responsive" style = {{height: '300px', margin: 'auto'}} src="img/01.jpg" alt = "" />
                                <h3>林子楊
                                    <small> </small>
                                </h3>
                            </div>
                            <div className="col-md-7">
                                <p style={{fontSize: '20px'}}>台灣企業家，生於台灣臺北縣板橋鎮，板橋高中初中部、中國海事專科學校（今台北海洋科技大學）畢業，是鴻海精密董事長、富士康科技集團總裁，以及永齡文教慈善基金會創辦人。以個人資產2504億台幣名列富比士億萬富翁列表中的第181大富豪，同時也是台灣首富</p>
                            </div> */}
                            <div className="col-md-5 text-center">
                                <img className = "img-responsive" style = {{height: '300px', margin: 'auto'}} src="img/03.jpg" alt = "" />
                                <h3>張峻宇
                                    <small> </small>
                                </h3>
                            </div>
                            <div className="col-md-7">
                                <p style={{fontSize: '20px'}}>全球知名半導體企業家，台灣積體電路公司創辦人、前董事長，工業技術研究院院士[3]，2018年代表中華臺北出使APEC。生於中華民國浙江，在上海及香港成長，並赴美國求學，擁有美國國籍[4]；曾就讀美國哈佛大學，畢業於美國麻省理工學院機械工程學系，取得美國史丹福大學電機工程博士。曾任工業技術研究院院長及麻省理工學院董事，也曾是世界先進積體電路公司董事長，曾獲IEEE榮譽獎章，並被浙江工商大學浙商博物館列入浙商名人</p>
                            </div>
                            <div className="clearfix"></div>
                        </div>
                    </div>
                </section>



                <section>
                    <div id="contact" data-matching-link="#contact-link" className="container">
                        <div className="row justify-content-md-center">
                                <div className="col-lg-12">
                                    <hr/>
                                    <h2 className="intro-text text-center">聯絡
                                        <strong> 楊峻  </strong>
                                    </h2>
                                    <hr/>
                                </div>
                        </div>

                        <div className="row justify-content-md-center">
                            <div className="col-6">
                                <p style={{fontSize: '20px'}}>地址:
                                    <strong> 中壢市還中東路685巷 </strong>
                                </p>
                                <p style={{fontSize: '20px'}}>Facebook:
                                    <strong><a href="https://www.facebook.com/"> 楊峻科技 </a></strong>
                                </p>
                            </div>
                            <div className="col-6">
                                <p style={{fontSize: '20px'}}>預約連絡電話:
                                    <strong> 0975383225 </strong>
                                </p>
                                <p style={{fontSize: '20px'}}>電子信箱:
                                    <strong><a href="mailto:name@example.com"> kc109763@gmail.com</a></strong>
                                </p>
                            </div>
                            <div className="clearfix"></div>
                        </div>

                        <div className="row justify-content-md-center">
                            <div className="col-12">
                                <iframe title="googlemap" width="100%" height="400" frameBorder="0"  scrolling="no" marginHeight="0" marginWidth="0" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3617.3384524490957!2d121.23010951500461!3d24.95459698400956!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3468224768a13763%3A0xa60d5314626591fc!2zMzIw5qGD5ZyS5biC5Lit5aOi5Y2A5Lit5YyX6Lev5LqM5q61NDUx5be3M-iZnw!5e0!3m2!1szh-TW!2stw!4v1470014756563"></iframe>
                            </div>

                            <div className="clearfix"></div>
                        </div>
                        
                    </div>
                </section>

            </div>
        );
    }
};

export default Home;