import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Button,
} from "@chakra-ui/react";
import { useRef } from "react";
import { sendPasswordResetLinkOnMail } from "../../Firebase/Firebase";

export default function ForgotPassword() {
  const emailRef = useRef("");
  return (
    <FormControl className="flex flex-col gap-8 py-4 px-8">
      {/* <FormLabel>Email address</FormLabel> */}
      <Input
        ref={emailRef}
        type="email"
        placeholder="Please enter your email"
        required
      />
      <Button
        colorScheme="gray"
        onClick={() => {
          console.log(emailRef.current.value);
          sendPasswordResetLinkOnMail(emailRef.current.value);
        }}
      >
        Reset
      </Button>
    </FormControl>
  );
}
