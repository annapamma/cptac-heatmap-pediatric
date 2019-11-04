<template>
    <div class="cptac-description">
    NCI supported <a href="https://proteomics.cancer.gov/programs/cptac">Clinical Proteomic Tumor Analysis Consortium (CPTAC)</a>,
        is a comprehensive and coordinated effort to accelerate the understanding of the molecular
        basis of cancer through the application of large-scale proteome (proteins) and genome (DNA and RNA)
        analysis technologies to different cancer types. CPTAC is composed of expertise in proteomics, genomics,
        cancer biology, oncology, and clinical chemistry, while creating open community resources that
        are widely used by the cancer community.
    <!--<p>For more information, visit the <a href="https://cptac-data-portal.georgetown.edu/cptac/s/S044;jsessionid=4C05CF34AAD5381E6E20ED192E932F5F">CPTAC-CCRCC data portal</a>.</p>-->
  </div>
</template>

<script>
export default {
  name: 'cptac-description',
};
</script>

<style scoped>
    .cptac-description {
        font-size: small;
        text-align: left;
        font-family: "Times New Roman", Times, serif;
        font-weight: bold;
        margin: 0 15px;
    }

    .cptac-description p {
        margin-top: 2px;
        margin-bottom: 0;
    }
</style>
