type CreateSeniorProps = {
  seniorName: string,
  seniorBirthday: string,
  seniorAddress: string,
  seniorGender: string,
  seniorRating: string,
  profileImage?: string,
  mimeType?: string,
}

export const createSenior = async ({ seniorName, seniorBirthday, seniorAddress, seniorGender, seniorRating, profileImage, mimeType }: CreateSeniorProps) => {
  return await fetch("/api/manager/addSenior", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
      "Authorization": "`Bearer ${accessToken}`"
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
        return true;
      }
      return false;
    });
}
