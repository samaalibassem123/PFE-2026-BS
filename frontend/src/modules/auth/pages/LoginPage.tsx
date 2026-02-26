import LoginForm from "../components/LoginForm";

export default function LoginPage() {
  return (
    <div className="flex  flex-col space-y-2 items-center h-lvh w-full justify-center">
      <img src="/company-logo.png" alt="company logo" className="mb-4" />
      <LoginForm />
      <div className=""></div>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
        className="absolute bottom-0 right-0"
      >
        <path
          fill="#ff5500"
          fill-opacity="1"
          d="M0,192L205.7,64L411.4,32L617.1,160L822.9,288L1028.6,256L1234.3,320L1440,32L1440,320L1234.3,320L1028.6,320L822.9,320L617.1,320L411.4,320L205.7,320L0,320Z"
        ></path>
      </svg>
    </div>
  );
}
