import { useRecoilValue } from "recoil";
import { accessTokenState, userInfoState } from "../store/store";

type CreateSeniorProps = {
  seniorName: string,
  seniorBirthday: string,
  seniorAddress: string,
  seniorGender: string,
  seniorRating: string,
  profileImage?: string,
  mimeType?: string,
}

type SeniorProps = {
  seniorId: string,
  seniorName: string,
  seniorAddress: string,
  seniorBirth: string,
  seniorGender: string,
  seniorGrade: string,
}


const useSenior = () => {
  const apiURL = process.env.REACT_APP_API_URL;
  const accessToken = useRecoilValue(accessTokenState);
  const userInfo = useRecoilValue(userInfoState);

  const createSenior = async ({ seniorName, seniorBirthday, seniorAddress, seniorGender, seniorRating, profileImage, mimeType }: CreateSeniorProps) => {
    return await fetch(`${apiURL}/manager/addSenior`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`
      },
      body: JSON.stringify(
        {
          seniorName: seniorName,
          seniorBirth: seniorBirthday,
          seniorAddress: seniorAddress,
          seniorGender: seniorGender,
          seniorGrade: seniorRating,
          profileImage: profileImage,
          mimeType: mimeType
        }
      ),
    })
      .then((response) => {
        // if (!response.ok) {
        //   throw new Error("Network response was not ok");
        // }
        return response.json();
      })
      .then((result) => {
        console.log(result);
        if (result.message !== "") {
          return result.user.seniorId;
        }
        return null;
      });
  }

  const getSenior = async (seniorId: string) => {
    return await fetch(`${apiURL}/manager/getSeniorInfo` + new URLSearchParams({
      seniorId: seniorId
    }), {
      method: "GET",
      headers: {
        // "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`
      },
    })
      .then((response) => {
        // if (!response.ok) {
        //   throw new Error("Network response was not ok");
        // }
        return response.json();
      })
      .then((result) => {
        console.log(result);
        if (result.message !== "") {
          return true;
        }
        return false;
      });
  }

  const getJobOffers = async (seniorId: string) => {
    return await fetch(`${apiURL}/manager/myJobOffer` + new URLSearchParams({
      seniorId: seniorId,
    }), {
      method: "GET",
      headers: {
        // "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`
      },
    })
      .then((response) => {
        // if (!response.ok) {
        //   throw new Error("Network response was not ok");
        // }
        return response.json();
      })
      .then((result) => {
        console.log(result);
        if (result.message !== "") {
          return true;
        }
        return false;
      });
  }

  // const getSeniors = async () => {
  //   if (getIsManager()) {
  //     userInfo.manager.seniors.map((senior: SeniorProps) =>
  //       getSenior(senior.seniorId);
  //     )
  //     return userInfo.manager.seniors;
  //   }
  //   return [];
  // }

  return { createSenior, getJobOffers };
}

export default useSenior;
