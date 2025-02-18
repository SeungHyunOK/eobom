import { useRecoilState } from "recoil";
import { accessTokenState, userTypeState, userInfoState } from "../store/store";

type CheckUserIdProps = {
  userId: string,
}

type CreateManagerProps = {
  userId: string,
  userPassword: string,
  userName: string,
  phoneNumber: string,
  userGender: string,
  profileImage: Blob | null,
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
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);

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

  const blobToByteArray = (blob: Blob): Promise<number[]> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result instanceof ArrayBuffer) {
          resolve(Array.from(new Uint8Array(reader.result)));
        }
      };
      reader.readAsArrayBuffer(blob);
    });
  };

  const createManager = async ({ userId, userPassword, userName, phoneNumber, userGender, profileImage, centerName, showerTruck, centerAddress, centerRating, centerIntro, regNumber, repName, openingDate }: CreateManagerProps) => {
    const image = profileImage ? await blobToByteArray(profileImage) : null;


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
          profileImage: { "type": "Buffer", "data": image },
          mimeType: "image/jpeg",
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
          getUserInfo(result.accessToken);
          return true;
        }
        return false;
      });
  }

  const logout = () => {
    setAccessToken("");
    setUserType("");
    setUserInfo({});
  }

  const getUserInfo = async (token?: string) => {
    return await fetch("/api/user/getUserInfo", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token ?? accessToken}`
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        console.log(result);
        if (result.userType) {
          setUserInfo(result);
          setUserType(result.userType);
          return true;
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
          logout();
          return true;
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
      body: JSON.stringify({}),
    })
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        if (result.accessToken) {
          setAccessToken(result.accessToken);
          return true;
        }
        return false;
      });
  }

  const getLoggedIn = () => {
    if (accessToken && userType) {
      return true;
    }
    return false;
  }

  const getUserType = () => {
    if (userType === "요양사") {
      return 1;
    } else if (userType === "관리사") {
      return 2;
    }
    return null;
  }

  return { checkUserId, createManager, login, logout, getUserInfo, deleteUser, getAccessToken, getLoggedIn, getUserType };
}

export default useAuth;
