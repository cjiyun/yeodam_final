import { destination, category } from '../types/typeInterfaces';

export const mockCategories: category[] = [
  // 지역
  {
    category_id: '1',
    category_name: '지역',
    keyword_id: '1',
    keyword_name: '서울',
    count: 0
  },
  {
    category_id: '1',
    category_name: '지역',
    keyword_id: '2',
    keyword_name: '경기도',
    count: 0
  },
  {
    category_id: '1',
    category_name: '지역',
    keyword_id: '3',
    keyword_name: '충청도',
    count: 0
  },
  {
    category_id: '1',
    category_name: '지역',
    keyword_id: '4',
    keyword_name: '전라도',
    count: 0
  },
  {
    category_id: '1',
    category_name: '지역',
    keyword_id: '5',
    keyword_name: '경상도',
    count: 0
  },
  {
    category_id: '1',
    category_name: '지역',
    keyword_id: '6',
    keyword_name: '강원도',
    count: 0
  },
  {
    category_id: '1',
    category_name: '지역',
    keyword_id: '7',
    keyword_name: '제주도',
    count: 0
  },
  // 여행목적
  {
    category_id: '2',
    category_name: '여행목적',
    keyword_id: '8',
    keyword_name: '힐링',
    count: 0
  },
  {
    category_id: '2',
    category_name: '여행목적',
    keyword_id: '9',
    keyword_name: '사진',
    count: 0
  },
  {
    category_id: '2',
    category_name: '여행목적',
    keyword_id: '10',
    keyword_name: '관광',
    count: 0
  },
  {
    category_id: '2',
    category_name: '여행목적',
    keyword_id: '11',
    keyword_name: '식도락',
    count: 0
  },
  {
    category_id: '2',
    category_name: '여행목적',
    keyword_id: '12',
    keyword_name: '액티비티',
    count: 0
  },
  {
    category_id: '2',
    category_name: '여행목적',
    keyword_id: '13',
    keyword_name: '체험',
    count: 0
  },
  // 계절
  {
    category_id: '3',
    category_name: '계절',
    keyword_id: '14',
    keyword_name: '봄',
    count: 0
  },
  {
    category_id: '3',
    category_name: '계절',
    keyword_id: '15',
    keyword_name: '여름',
    count: 0
  },
  {
    category_id: '3',
    category_name: '계절',
    keyword_id: '16',
    keyword_name: '가을',
    count: 0
  },
  {
    category_id: '3',
    category_name: '계절',
    keyword_id: '17',
    keyword_name: '겨울',
    count: 0
  },
  // 여행테마
  {
    category_id: '4',
    category_name: '여행테마',
    keyword_id: '18',
    keyword_name: '역사',
    count: 0
  },
  {
    category_id: '4',
    category_name: '여행테마',
    keyword_id: '19',
    keyword_name: '자연',
    count: 0
  },
  {
    category_id: '4',
    category_name: '여행테마',
    keyword_id: '20',
    keyword_name: '도심',
    count: 0
  },
  {
    category_id: '4',
    category_name: '여행테마',
    keyword_id: '21',
    keyword_name: '농촌',
    count: 0
  },
  {
    category_id: '4',
    category_name: '여행테마',
    keyword_id: '22',
    keyword_name: '당일치기',
    count: 0
  }
];

export const mockDestinationsKeywords = [
  {
    dest_id: '1',
    keyword_id: '1',
  },
  {
    dest_id: '1',
    keyword_id: '9',
  },
  {
    dest_id: '1',
    keyword_id: '10',
  },
  {
    dest_id: '1',
    keyword_id: '14',
  },
  {
    dest_id: '1',
    keyword_id: '16',
  },
  {
    dest_id: '1',
    keyword_id: '20',
  },
  {
    dest_id: '2',
    keyword_id: '4',
  },
  {
    dest_id: '2',
    keyword_id: '8',
  },
  {
    dest_id: '2',
    keyword_id: '10',
  },
  {
    dest_id: '2',
    keyword_id: '9',
  },
  {
    dest_id: '2',
    keyword_id: '14',
  },
  {
    dest_id: '2',
    keyword_id: '16',
  },
  {
    dest_id: '2',
    keyword_id: '18',
  },
  {
    dest_id: '3',
    keyword_id: '4',
  },
  {
    dest_id: '3',
    keyword_id: '8',
  },
  {
    dest_id: '3',
    keyword_id: '9',
  },
  {
    dest_id: '3',
    keyword_id: '14',
  },
  {
    dest_id: '3',
    keyword_id: '15',
  },
  {
    dest_id: '3',
    keyword_id: '19',
  },
  {
    dest_id: '4',
    keyword_id: '6',
  },
  {
    dest_id: '4',
    keyword_id: '8', 
  },
  {
    dest_id: '4',
    keyword_id: '10',
  },
  {
    dest_id: '4',
    keyword_id: '11',
  },
  {
    dest_id: '4',
    keyword_id: '16',
  },
  {
    dest_id: '4',
    keyword_id: '22',
  },
  {
    dest_id: '5',
    keyword_id: '6',
  },
  {
    dest_id: '5',
    keyword_id: '9',
  },
  {
    dest_id: '5',
    keyword_id: '11',
  },
  {
    dest_id: '5',
    keyword_id: '15',
  },
  {
    dest_id: '6',
    keyword_id: '5',
  },
  {
    dest_id: '6',
    keyword_id: '8',
  },
  {
    dest_id: '6',
    keyword_id: '10',
  },
  {
    dest_id: '6',
    keyword_id: '19',
  },
  {
    dest_id: '6',
    keyword_id: '18',
  },
  {
    dest_id: '7',
    keyword_id: '5',
  },
  {
    dest_id: '7',
    keyword_id: '12',
  },
  {
    dest_id: '7',
    keyword_id: '13',
  },
  {
    dest_id: '7',
    keyword_id: '14',
  },
  {
    dest_id: '7',
    keyword_id: '16',
  },
  {
    dest_id: '7',
    keyword_id: '19',
  },
  {
    dest_id: '8',
    keyword_id: '6',
  },
  {
    dest_id: '8',
    keyword_id: '8',
  },
  {
    dest_id: '8',
    keyword_id: '9',
  },
  {
    dest_id: '8',
    keyword_id: '12',
  },
  {
    dest_id: '8',
    keyword_id: '13',
  },
  {
    dest_id: '8',
    keyword_id: '15',
  },
  {
    dest_id: '8',
    keyword_id: '19',
  },
]

export const mockTopRatedDestinations: destination[] = [
  {
    dest_id: '1',
    dest_name: "남산서울타워",
    location: "서울",
    image: [
      require('../assets/images/N-Seoul-tower.jpeg'),
      require('../assets/images/N-Seoul-tower.jpeg'),
      require('../assets/images/N-Seoul-tower.jpeg'),
      require('../assets/images/N-Seoul-tower.jpeg'),
      require('../assets/images/N-Seoul-tower.jpeg'),
      require('../assets/images/N-Seoul-tower.jpeg'),
    ],
    rating: 4.5,
  },
  {
    dest_id: '2',
    dest_name: '전주한옥마을',
    location: '전주',
    image: [
      require('../assets/images/jeonju.jpeg'),
      require('../assets/images/jeonju.jpeg'),
      require('../assets/images/jeonju.jpeg'),
    ],
    address: '전북특별자치도 전주시 완산구 기린대로 99',
    description: '전주 한옥마을은 전북특별자치도 전주시 완산구 풍남동과 교동에 위치한 한옥마을로, 대한민국을 대표하는 여행지입니다.',
    rating: 4.1,
    nearbyRestaurants: [
      {
        name: '베테랑 칼국수',
        image: require('../assets/images/veteran.png'),
      },
      {
        name: '전주 피순대',
        image: require('../assets/images/bloodsoondae.png'),
      },
      {
        name: '교동다원',
        image: require('../assets/images/ryehd.png'),
      },
    ],
  },
  {
    dest_id: '3',
    dest_name: '담양 죽녹원',
    location: '담양',
    image: [
      require('../assets/images/pubao.png'),
      require('../assets/images/pubao.png'),
      require('../assets/images/pubao.png'),
    ],
    address: '전남 담양군 담양읍 죽녹원로 119',
    description: '전라남도 담양군에 위치한 죽녹원은 원래부터 대나무숲인 곳으로 2003년에 이르러 숲에 공원을 조성하고 전국적으로 이름을 알린 곳이다.',
    rating: 4.4,
  },
  {
    dest_id: '4',
    dest_name: '남이섬',
    location: '춘천',
    image: [
      require('../assets/images/nam2.png'),
      require('../assets/images/nam2.png'),
      require('../assets/images/nam2.png'),
    ],
    address: '춘천시 남산면 남이섬길',
    description: '남이섬은 강원도 춘천시 남산면 방하리에 위치한 섬으로, 자연과 인간의 공존을 꿈꾸는 관광 명소입니다:',
    rating: 4.4,
  },
  {
    dest_id: '5',
    dest_name: '설악산',
    location: '속초, 양양, 인제',
    image: [
      require('../assets/images/sulak.png'),
      require('../assets/images/sulak.png'),
      require('../assets/images/sulak.png'),
    ],
    address: '대한민국 강원특별자치도 속초시·양양군·인제군',
    description: '설악산은 163.6㎢에 이르는 지역이 천연보호구역으로 지정되어 있으며, 최고봉인 1,708m의 대청봉을 비롯해 1,200m를 넘는 높은 봉우리들로 이루어져 있다.',
    rating: 4.7,
  },
]

// Mock destinations 데이터
export const mockDestinations: destination[] = [
  {
    dest_id: '1',
    dest_name: "남산서울타워",
    location: "서울",
    image: [
      require('../assets/images/N-Seoul-tower.jpeg'),
      require('../assets/images/N-Seoul-tower.jpeg'),
      require('../assets/images/N-Seoul-tower.jpeg'),
      require('../assets/images/N-Seoul-tower.jpeg'),
      require('../assets/images/N-Seoul-tower.jpeg'),
      require('../assets/images/N-Seoul-tower.jpeg'),
    ],
    address: '서울특별시 용산구 남산공원길 105',
    description: '서울의 상징적인 타워\n‘남산서울타워’는 효율적인 방송전파 송수신과 한국의 전통미를 살린 관광 전망시설의 기능을 겸비한 국내 최초의 종합전파 탑으로 방송문화와 관광산업의 미래를 위해 건립되었습니다.\n\n세계 유명한 종합 탑들이 그 나라 또는 그 도시의 상징적인 존재가 된 것처럼 \'남산서울타워\' 역시 지난 40여 년간 대한민국의 대표적인 관광지이자 서울의 상징물 역할을 해왔습니다.\n\n‘남산서울타워’는 서울 시내 전 지역에서 바라보이는 탑의 높이와 독특한 구조, 형태 등으로 인하여 시민의 관심과 사랑의 대상이 되었고, 내외국인들이 즐겨 찾는 제1의 관광 명소로서의 위치를 확고히 하고 있습니다. 최근에는 한류 바람을 몰고 온 각종 예능, 드라마의 촬영지로 이름이 높아지면서 내외국인 관광객들이 발길이 끊이지 않는 곳입니다.\n\n\n\n전화번호\n02-3455-9277\n\n홈페이지\nwww.seoultower.co.kr\n\n이용요금\n전망대 : 대인 21,000원, 소인 16,000원\n\n이용시간\n평일 10:30-22:30\n주말 및 공휴일 10:00-23:00\n* 마감시간 30분 전까지 입장 가능\n* 레스토랑 운영시간은 매장마다 상이하므로 홈페이지 참고',
    rating: 4.5,
  },


  {
    dest_id: '2',
    dest_name: '전주한옥마을',
    location: '전주',
    image: [
      require('../assets/images/jeonju.jpeg'),
      require('../assets/images/jeonju.jpeg'),
      require('../assets/images/jeonju.jpeg'),
    ],
    address: '전북특별자치도 전주시 완산구 기린대로 99',
    description: '전주 한옥마을은 전북특별자치도 전주시 완산구 풍남동과 교동에 위치한 한옥마을로, 대한민국을 대표하는 여행지입니다.',
    
    nearbyRestaurants: [
      {
        name: '베테랑 칼국수',
        image: require('../assets/images/veteran.png'),
      },
      {
        name: '전주 피순대',
        image: require('../assets/images/bloodsoondae.png'),
      },
      {
        name: '교동다원',
        image: require('../assets/images/ryehd.png'),
      },
    ],
    rating: 4.1,
  },


  {
    dest_id: '3',
    dest_name: '담양 죽녹원',
    location: '담양',
    image: [
      require('../assets/images/pubao.png'),
      require('../assets/images/pubao.png'),
      require('../assets/images/pubao.png'),
    ],
    address: '전남 담양군 담양읍 죽녹원로 119',
    description: '전라남도 담양군에 위치한 죽녹원은 원래부터 대나무숲인 곳으로 2003년에 이르러 숲에 공원을 조성하고 전국적으로 이름을 알린 곳이다.',
    rating: 4.4,
  },


  {
    dest_id: '4',
    dest_name: '남이섬',
    location: '춘천',
    image: [
      require('../assets/images/nam2.png'),
      require('../assets/images/nam2.png'),
      require('../assets/images/nam2.png'),
    ],
    address: '춘천시 남산면 남이섬길',
    description: '남이섬은 강원도 춘천시 남산면 방하리에 위치한 섬으로, 자연과 인간의 공존을 꿈꾸는 관광 명소입니다:',
    rating: 4.4,
  },

  {
    dest_id: '5',
    dest_name: '설악산',
    location: '속초, 양양, 인제',
    image: [
      require('../assets/images/sulak.png'),
      require('../assets/images/sulak.png'),
      require('../assets/images/sulak.png'),
    ],
    address: '대한민국 강원특별자치도 속초시·양양군·인제군',
    description: '설악산은 163.6㎢에 이르는 지역이 천연보호구역으로 지정되어 있으며, 최고봉인 1,708m의 대청봉을 비롯해 1,200m를 넘는 높은 봉우리들로 이루어져 있다.',
    rating: 4.7,
  },

  {
    dest_id: '6',
    dest_name: '토함산자연휴양림',
    location: '경주',
    image: [
      require('../assets/images/toham.png'),
      require('../assets/images/toham.png'),
      require('../assets/images/toham.png'),
    ],
    address: '경상북도 경주시 양북면 불국로 1208-45',
    description: '토함산 자연휴양림은 불국사와 석굴암을 품고 있는 토함산의 동쪽 기슭에. 경주시 시설관리공단에서 운영하는 휴양시설이다.',
    rating: 4.0,
  },

  {
    dest_id: '7',
    dest_name: '하동알프스레포츠 짚 와이어',
    location: '하동',
    image: [
      require('../assets/images/hadong.png'),
      require('../assets/images/hadong.png'),
      require('../assets/images/hadong.png'),
    ],
    address: '경상남도 하동군 금남면 경충로 493-37',
    description: '하동군의 수려한 다도해가 한눈에 펼쳐보이는 금오산 정상에서 하강하는 짜릿한 짚와이어체험공간',
    rating: 4.6,
  },

  {
    dest_id: '8',
    dest_name: '강원 삼척 카누',
    location: '삼척',
    image: [
      require('../assets/images/kanu.png'),
      require('../assets/images/kanu.png'),
      require('../assets/images/kanu.png'),
    ],
    address: '강원도 삼척시 근덕면 장호항길 111',
    description: '바다 위에서 투명한 카누를 타며 바다를 즐길 수 있는 이색 체험',
    rating: 4.4,
  },
];

export const mockReviews = {
  destReviews: [
    {
      dest_rev_id: 1,
      dest_id: '1',
      user_id: 'user1',
      date: '2024-02-15',
      content: '야경이 정말 예뻤어요! 다음에 또 방문하고 싶습니다.',
      created_at: '2024-02-15T12:00:00',
      dest_name: '남산서울타워'  // 화면 표시용
    },
    {
      dest_rev_id: 2,
      dest_id: '2',
      user_id: 'user1',
      date: '2024-02-10',
      content: '한옥의 멋을 잘 느낄 수 있었습니다. 주변 맛집도 많아요.',
      created_at: '2024-02-10T14:30:00',
      dest_name: '전주한옥마을'  // 화면 표시용
    }
  ],
  restReviews: [
    {
      rest_rev_id: 1,
      rest_id: '1',
      user_id: 'user1',
      date: '2024-02-14',
      content: '칼국수가 정말 맛있었어요! 특히 면발이 쫄깃했습니다.',
      created_at: '2024-02-14T18:00:00',
      rest_name: '베테랑 칼국수'  // 화면 표시용
    }
  ]
};
