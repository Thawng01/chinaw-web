import "./sharedmenu.css";
import {
    CardGiftcardOutlined,
    ContactMail,
    Money,
    PostAddRounded,
    QuestionMarkRounded,
    SettingsOutlined,
    HomeOutlined,
} from "@mui/icons-material";

import { useContext } from "react";
import { AuthContext } from "../auth/AuthContext";
import LeftSideListItem from "../sides/leftSide/LeftSideListItem";

const SharedMenu = ({ userInfo }) => {
    const { setIsMenuOpen } = useContext(AuthContext);

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    let name = userInfo?.username ? userInfo?.username : userInfo?.email;
    name = name?.split("@")[0];

    return (
        <div className="leftWrapper">
            <div className="leftProfileContainer">
                <img src={userInfo?.image} alt="" className="leftProfileImg" />
                <div className="leftProfileInfos">
                    <p className="leftProfileUsername">{name}</p>
                    <span>
                        {userInfo?.post?.length}{" "}
                        <span>
                            {userInfo?.post?.length > 1 ? "Posts" : "Post"}
                        </span>
                    </span>
                    {userInfo?.bio && (
                        <p className="leftDesc">{userInfo.bio}</p>
                    )}
                    <p className="leftPoint">
                        Points:{" "}
                        <span>
                            {userInfo?.points}
                            <span>
                                {userInfo?.points > 1 ? " points" : " point"}
                            </span>
                        </span>
                    </p>
                </div>
            </div>

            <div className="leftLine" />

            <ul className="leftItems">
                <LeftSideListItem
                    title="Home"
                    desc="View home"
                    Icon={HomeOutlined}
                    to="/"
                    onClick={closeMenu}
                />

                <LeftSideListItem
                    title="Your post"
                    desc="View your own post"
                    Icon={PostAddRounded}
                    to={`/profile/${userInfo?.uid}`}
                    onClick={closeMenu}
                />

                <LeftSideListItem
                    title="Your points"
                    desc="View your points"
                    Icon={Money}
                    to="/points"
                    onClick={closeMenu}
                />

                <LeftSideListItem
                    title="Daily points"
                    desc="Claim your daily points"
                    to="/dailypoints"
                    Icon={CardGiftcardOutlined}
                    onClick={closeMenu}
                />

                <LeftSideListItem
                    title="Setting"
                    desc="View your info"
                    to="/settings"
                    Icon={SettingsOutlined}
                    onClick={closeMenu}
                />

                <LeftSideListItem
                    title="FAQs"
                    desc="Read FQAs"
                    to="/fqas"
                    Icon={QuestionMarkRounded}
                    onClick={closeMenu}
                />

                <LeftSideListItem
                    title="Contacts"
                    desc="Contact admin"
                    to="/contact"
                    Icon={ContactMail}
                    onClick={closeMenu}
                />
            </ul>
        </div>
    );
};

export default SharedMenu;
