import { useSetRecoilState } from "recoil";
import { accessTokenState } from "../store/store";

type RegistrationNumberProps = {
  regNumber: string,
  repName: string,
  startDate: string,
}

type CheckUserIdProps = {
  userId: string,
}

type CreateManagerProps = {
  userId: string,
  userPassword: string,
  userName: string,
  phoneNumber: string,
  userGender: string,
  profileImage: string,
  mimeType?: string,
  centerName: string,
  showerTruck?: boolean | null,
  centerAddress: string,
  centerRating?: string | null,
  operatingPeriod?: string,
  // openingDate?: string,
  centerIntro: string,
  regNumber: string,
  repName: string,
  openingDate: string,
}

type LoginProps = {
  userId: string,
  userPassword: string,
}

const useAuth = () => {
  const setAccessToken = useSetRecoilState(accessTokenState);

  const checkUserId = async ({ userId }: CheckUserIdProps) => {
    return await fetch("/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(
        {
          id: userId,
          pw: "",
        }
      ),
    })
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        if (result.message === "Error: 아이디가 존재하지 않습니다.") {
          return false;
        }
        return true;
      });
  }

  const createManager = async ({ userId, userPassword, userName, phoneNumber, userGender, profileImage, centerName, showerTruck, centerAddress, centerRating, centerIntro, regNumber, repName, openingDate }: CreateManagerProps) => {
    return await fetch("/api/manager/sign_up", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(
        {
          id: userId,
          pw: userPassword,
          name: userName,
          phone: phoneNumber,
          userType: "관리사",
          gender: "남성",
          // profileImage: profileImage,
          // mimeType: "j",
          centerName: centerName,
          hasBathVehicle: showerTruck ?? false,
          centerAddress: centerAddress,
          centerGrade: centerRating,
          // operatingPeriod: openingDate,
          centerIntro: centerIntro,
          b_no: regNumber,
          p_nm: repName,
          start_dt: openingDate.replace(/[^0-9]/g, "")

        }
      ),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((result) => {
        console.log(result);
        return result;
      });
  }

  const login = async ({ userId, userPassword }: LoginProps) => {
    return await fetch("/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(
        {
          id: userId,
          pw: userPassword,
        }
      ),
    })
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        if (result.accessToken) {
          setAccessToken(result.accessToken);
          return true
        }
        return false;
      });
  }

  return { checkUserId, createManager, login }
}

export default useAuth;
