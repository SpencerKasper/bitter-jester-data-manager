import React, {Fragment, useState} from 'react';
import {OriginalSongs} from "../Pages/OriginalSongCompetition";
import {Title} from "../Components/Title";
import ReactAudioPlayer from 'react-audio-player';
import {Card, Row} from "reactstrap";
import LyricsPdfCard from "../Components/Cards/LyricsPdfCard";


type Props = {
    originalSongs: OriginalSongs;
}

const OriginalSongCard = (props: Props) => {
    const [songIndex, setSongIndex] = useState(0);
    const originalSongs = props.originalSongs.originalSongs;
    const hasSongs = originalSongs.length;
    const originalSong = originalSongs[songIndex];
    const bandPhotoUrl = hasSongs ? originalSong.bandPhotoUrl : '';
    const songUrl = hasSongs ? originalSong.songUrl : '';

    const updateSongIndex = (plusOrMinusOne: 1 | -1) => {
        const newSongIndex = songIndex + plusOrMinusOne;
        const maximumSongIndex = originalSongs.length - 1;

        if (newSongIndex > maximumSongIndex) {
            setSongIndex(0);
        } else if (newSongIndex < 0) {
            setSongIndex(maximumSongIndex);
        } else {
            setSongIndex(newSongIndex);
        }
    };

    return (
        <Fragment>
            <Row>
                <div style={{padding: '16px', display: "flex", alignContent: "stretch", justifyContent: "center"}}>
                    <Card>
                        <Title titleDisplayText={hasSongs ? originalSong.bandName : ''}/>
                        <div style={{display: 'block'}}>
                            <div style={{display: 'inline-block', padding: '0px 16px'}}>
                                <button onClick={() => updateSongIndex(-1)}>{'<'}</button>
                            </div>
                            <div style={{display: 'inline-block'}}>
                                <img height={400} src={bandPhotoUrl} alt={'Band could not be loaded'}/>
                            </div>
                            <div style={{display: 'inline-block', padding: '0px 16px'}}>
                                <button onClick={() => updateSongIndex(1)}>{'>'}</button>
                            </div>
                        </div>
                        <div style={{padding: '8px', display: 'block'}}>
                            <ReactAudioPlayer src={songUrl} controls/>
                        </div>
                    </Card>
                </div>
                <LyricsPdfCard originalSong={originalSong}/>
            </Row>
        </Fragment>
    );
};

export default OriginalSongCard;