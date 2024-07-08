import React, { useState } from 'react';

import { navItems } from "../../../data/app-variables";
import Navbar from "../../../components/navbar/Navbar";
import BigTitle from "../../../components/ui/big-title/BigTitle";
import SmallText from "../../../components/ui/small-text/SmallText";

import bgImage1 from "../../../assets/backgrounds/products-page.svg"
import bgImage2 from "../../../assets/backgrounds/meet-the-gang-page.svg";
import ShaniAvatar from "../../../assets/avatars/ShaniAvatar.svg"
import TomerAvatar from "../../../assets/avatars/TomerAvatar.svg"
import LiorAvatar from "../../../assets/avatars/LiorAvatar.svg"
import InbarAvatar from "../../../assets/avatars/InbarAvatar.svg"
import AmirAvatar from "../../../assets/avatars/AmirAvatar.svg"

import YanaAvatar from "../../../assets/avatars/YanaAvatar.svg"
import HaskinAvatar from "../../../assets/avatars/HaskinAvatar.svg"
import MichalAvatar from "../../../assets/avatars/MichalAvatar.svg"
import DootAvatar from "../../../assets/avatars/DootAvatar.svg"
import NoamAvatar from "../../../assets/avatars/NoamAvatar.svg"
import ShiraAvatar from "../../../assets/avatars/ShiraAvatar.svg"
import EllaAvatar from "../../../assets/avatars/EllaAvatar.svg"
import LehovitzerAvatar from "../../../assets/avatars/LehovitzerAvatar.svg"

import classes from "./MeetTheGang.module.css"
import content from "../../../data/content.json";

const MeetTheGang = () => {
    const meetTheGang = content.meetTheGang;
    
    const [team101, setTeam101] = useState(false);

    const avatarsArray = [HaskinAvatar, MichalAvatar, DootAvatar, NoamAvatar, ShiraAvatar, EllaAvatar, LehovitzerAvatar, YanaAvatar, LiorAvatar, InbarAvatar, TomerAvatar, AmirAvatar];
    const createPerson = (person, index, isLeader) => {
        return <div key={person.name} className={`${classes.person} ${isLeader ? classes.leader : null}`} >
            <img src={avatarsArray[index]} alt={person.name} className={classes.avatarImg}/>
            <span className={classes.personText}>
                <SmallText> {person.name} </SmallText>
                <SmallText> {person.job} </SmallText>
            </span>
        </div>
    }
    
    const people = meetTheGang.theGang;
    const personElement = people.map((person, index) => (
        createPerson(person, index)
    ))

    return (
        <div>
            <img src={bgImage1} className={classes.bgImage1}/>
            <img src={bgImage2} className={classes.bgImage2}/>
            <main className={classes.topPart}>
                <section className={classes.bigTextBlock}>
                    <BigTitle className={classes.title}>מי אנחנו?</BigTitle>
                    <div className={classes.team101Hover} onClick={() => setTeam101((prev) => !prev)}></div>
                    <SmallText className={classes.infoText}> {meetTheGang.info} </SmallText>
                </section>
                {createPerson(meetTheGang.leader, personElement.length, true)}
            </main>
            <div className={classes.people}>
                {personElement}
            </div>
            {team101 && <div className={[`${classes.people} ${classes.team101}`]}>
                {createPerson(meetTheGang.team101[0], 8)}
                {createPerson(meetTheGang.team101[1], 9)}
                {createPerson(meetTheGang.team101[2], 10)}
                {createPerson(meetTheGang.team101[3], 11)}
            </div>}
        </div>
    );
};

export default MeetTheGang;