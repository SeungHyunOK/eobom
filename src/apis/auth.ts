import { useRecoilState } from "recoil";
import { accessTokenState, userTypeState } from "../store/store";

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
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);
  const [userType, setUserType] = useRecoilState(userTypeState);

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
          getUserInfo();
          return true
        }
        return false;
      });
  }

  const getUserInfo = async () => {
    return await fetch("/api/user/getUserInfo", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        console.log(result);
        if (result.userType) {
          setUserType(result.userType);
          return true
        }
        return false;
      });
  }

  const deleteUser = async () => {
    return await fetch("/api/user/withdrawal", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        if (result.message) {
          return true
        }
        return false;
      });
  }

  const getAccessToken = async () => {
    return await fetch("/api/user/getAccessToken", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
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

  return { checkUserId, createManager, login, getUserInfo, deleteUser, getAccessToken };
}

export default useAuth;
