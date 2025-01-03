import React from 'react';
import {Image} from 'react-native';
import {GlobalView} from '../../styles/GlobalStyle';
import {
  MainAddCircle,
  MainBannerBox,
  MainBannerSpan,
  MainBannerText,
  MainContainer,
  MainScrollView,
} from './styles';
import MainBox from '../../components/mainBox/MainBox';
import {useMain} from './hooks';
import NoneBox from '../../components/noneBox/NoneBox';

export default function Main() {
  const {handlePress, travels} = useMain();

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
                  travel.thumbnail
                    ? {uri: travel.thumbnail}
                    : require('../../assets/images/example_image.png')
                }
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
          <NoneBox onPress={handlePress} />
        )}
      </MainContainer>
    </GlobalView>
  );
}
