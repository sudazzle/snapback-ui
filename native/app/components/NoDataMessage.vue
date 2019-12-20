<template>
<GridLayout padding="30" width="100%" height="100%" columns="*" rows="*">
  <GridLayout padding="30" borderRadius="10" backgroundColor="#eee">
    <StackLayout height="200">
      <Image src="~/assets/none.png" width="80" height="80" stretch="aspectFit" />
      <Label fontSize="18px" color="#666" marginTop="15" textAlignment="center" :text="message" textWrap="true" />
    </StackLayout>
  </GridLayout>
</GridLayout>
</template>

<script>
  export default {
    name: "no-data-message",
    props: ["message"]    
  }
</script>