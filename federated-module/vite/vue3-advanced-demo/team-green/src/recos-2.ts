
// 需要使用前缀路径区分，否则在host使用时，访问的是host的路径地址
import reco_1 from '/reco_1.jpg?inline'
import reco_2 from '/reco_2.jpg?inline'
import reco_3 from '/reco_3.jpg?inline'
import reco_4 from '/reco_4.jpg?inline'
import reco_5 from '/reco_5.jpg?inline'
import reco_6 from '/reco_6.jpg?inline'
import reco_7 from '/reco_7.jpg?inline'
import reco_8 from '/reco_8.jpg?inline'
import reco_9 from '/reco_9.jpg?inline'

export const allRecommendations:{[key:string]: any } = {
    porsche: [
      {
        id: '3',
        image: reco_3,
      },
      {
        id: '5',
        image: reco_5,
      },
      {
        id: '6',
        image: reco_6,
      },
    ],
    fendt: [
      {
        id: '3',
        image: reco_3,
      },
      {
        id: '6',
        image:reco_6,
      },
      {
        id: '4',
        image: reco_4,
      },
    ],
    eicher: [
      {
        id: '1',
        image: reco_1,
      },
      {
        id: '8',
        image:reco_8,
      },
      {
        id: '7',
        image: reco_7,
      },
    ],
  };