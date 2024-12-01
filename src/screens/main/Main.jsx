import React, {useEffect, useState} from 'react';
import {Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {GlobalView} from '../../styles/GlobalStyle';
import {
  MainAddCircle,
  MainBannerBox,
  MainBannerSpan,
  MainBannerText,
  MainContainer,
  MainNoneBox,
  MainNoneBoxText,
  MainScrollView,
} from './styles';
import MainBox from '../../components/mainBox/MainBox';
import {useMain} from './hooks';

export default function Main() {
  const {handlePress} = useMain();
  const [travels, setTravels] = useState([]); // travels 상태 관리

  // 로컬 스토리지에서 데이터를 가져오는 함수
  const fetchTravels = async () => {
    try {
      const storedTravels = await AsyncStorage.getItem('travels');
      if (storedTravels) {
        setTravels(JSON.parse(storedTravels)); // travels 상태 업데이트
      }
    } catch (error) {
      console.error('Failed to load travels:', error);
    }
  };

  // 컴포넌트가 마운트될 때 데이터 가져오기
  useEffect(() => {
    fetchTravels();
  }, []);

  return (
    <GlobalView>
      <MainContainer>
        <Image
          source={require('../../assets/images/Logo.png')}
          style={{width: 116, height: 30}}
        />
        <MainBannerBox>
          <MainBannerText>
            <MainBannerSpan>"여행조각"</MainBannerSpan>
            으로 여행의 모든 순간을 {`\n`}하나의 조각으로 남겨 보세요 !
          </MainBannerText>
        </MainBannerBox>
        {travels.length > 0 ? (
          <MainScrollView>
            {travels.map(travel => (
              <MainBox
                key={travel.id}
                id={travel.id}
                image={
                  travel.image ||
                  require('../../assets/images/example_image.png')
                } // 기본 이미지
                title={travel.title}
                place={travel.place}
                beginDate={travel.beginDate}
                endDate={travel.endDate}
                pieces={travel.pieces}
              />
            ))}
            <MainAddCircle onPress={handlePress}>
              <Image
                source={require('../../assets/images/add_white.png')}
                style={{width: 30, height: 30}}
              />
            </MainAddCircle>
          </MainScrollView>
        ) : (
          <MainNoneBox onPress={handlePress}>
            <Image
              source={require('../../assets/images/add.png')}
              style={{width: 60, height: 60}}
            />
            <MainNoneBoxText>여행 일정을 등록해보세요 !</MainNoneBoxText>
          </MainNoneBox>
        )}
      </MainContainer>
    </GlobalView>
  );
}
