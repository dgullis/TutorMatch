import UploadImage from "./UploadImage";
import AboutMe from "./AboutMe";
import ProfileSubjects from "./ProfileSubjects";
import { TutorStarRating } from "./TutorRating/TutorStarRating";
import { useAuth } from "../components/authContext";

const UserProfile = (props) => {
    const { idToken } = useAuth()
    return (
        <div key={props.user.firebase_id} style={{ marginBottom: '20px' }}>
            <div>
                <img 
                    src={props.user.profileImage ? props.user.profileImage : "https://firebasestorage.googleapis.com/v0/b/tutormatch-e2a6a.appspot.com/o/profile-images%2FScreenshot%202024-03-07%20at%2010.12.22.png?alt=media&token=22295bdd-8c61-4837-aba0-6bc98985c0f3"} 
                    alt="description" 
                    style={{ width: "150px", height: "150px", borderRadius: "50%", margin: '10px' }}
                />
            </div>
            <div>
                <TutorStarRating 
                    tutorReviews={props.user.reviews}
                    tutorRating={props.user.rating}
                    userStatus={props.user.status}
                />
            </div>

            {props.isCurrentUser &&
                <div style={{ marginBottom: '10px' }}>
                    <UploadImage 
                        firebase_id={props.user.firebase_id}
                        onChangeProfileImage={props.onChangeProfileImage}
                        idToken={idToken} />
                </div>
            }
            <div>
                <strong>Name:</strong><br/> {props.user.name} 
            </div>
            <div>
                <strong>Email:</strong> <br/>{props.user.email}
            </div>
            <div>
                <strong>About me:</strong> <br/>
            {props.isCurrentUser ? (
                <div>
                    <AboutMe
                        userDetails={props.user}
                    />
                </div>
            ) : (
                <div>
                    {props.user.bio}
                </div>
            )}
                <div className="mt-3">
                    <strong>Available to tutor:</strong>
                </div>
                <div className="mt-3">
                {props.gcse && (
                        <>
                        <strong>GCSE:</strong> {props.gcse.map((subject, index) => (
                            <span className= "p-1 m-1 bg-gradient text-dark rounded-1" key={index} style={{ backgroundColor: "#81B29A"}}>
                                {subject.name} 
                            </span>
                        ))}
                        </>
                    )}
                </div>
                
                <div className="mt-2">
                {props.alevel && (
                        <>
                        <strong>A Level:</strong> {props.alevel.map((subject, index) => (
                            <span className= "p-1 m-1 bg-gradient text-dark rounded-1" key={index} style={{ backgroundColor: "#81B29A"}}>
                            {subject.name} 
                        </span>
                        ))}
                        </>
                )}  
                </div>
                
            </div>
        </div>

    );
    };

export default UserProfile;