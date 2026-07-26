// =====================================
// SECURITY & ENGINE LOGIC
// =====================================

const MASTER_KEY = "THAI-BOSS-2026"; // তোমার আজীবন ফ্রি অ্যাক্সেস কী
const OWNER_PHONE = "8801700000000"; // তোমার হোয়াটসঅ্যাপ নম্বর (দেশের কোডসহ)

document.addEventListener("DOMContentLoaded", () => {
    // ১. স্প্ল্যাশ স্ক্রিন টাইমার (২.৫ সেকেন্ড পর অ্যাপ লোড হবে)
    setTimeout(() => {
        const splash = document.getElementById("splash-screen");
        if (splash) {
            splash.style.opacity = "0";
            setTimeout(() => {
                splash.style.display = "none";
                checkAppActivation();
            }, 500);
        }
    }, 2500);

    // ২. গোপন ফিচার: লক আইকনে ৫ বার ক্লিক করলে সরাসরি মাস্টার কী ইনপুট হয়ে যাবে!
    let tapCount = 0;
    const secretTapBtn = document.getElementById("secret-logo-tap");
    if (secretTapBtn) {
        secretTapBtn.addEventListener("click", () => {
            tapCount++;
            if (tapCount === 5) {
                tapCount = 0;
                document.getElementById("input-product-key").value = MASTER_KEY;
                alert("👑 Admin Mode Detected! Master Key Applied.");
            }
        });
    }
});

// ডিভাইস আইডি পাওয়ার ফাংশন
function getDeviceId() {
    let devId = localStorage.getItem("app_device_id");
    if (!devId) {
        devId = "THAI-" + Math.floor(1000 + Math.random() * 9000);
        localStorage.setItem("app_device_id", devId);
    }
    return devId;
}

// অ্যাপ অ্যাক্টিভ আছে কিনা চেক করা
function checkAppActivation() {
    const isActivated = localStorage.getItem("app_activated");
    const expiryDate = localStorage.getItem("app_expiry");
    let now = new Date().getTime();

    if (isActivated === "true" && expiryDate && now < parseInt(expiryDate)) {
        document.getElementById("activation-modal").style.display = "none";
        document.getElementById("app-container").style.display = "block";
    } else {
        document.getElementById("app-container").style.display = "none";
        document.getElementById("activation-modal").style.display = "flex";

        let deviceId = getDeviceId();
        document.getElementById("display-device-id").innerText = deviceId;

        let waMsg = encodeURIComponent(`Hello, my Device ID is: ${deviceId}. I want to buy Product Key for Thai Calculator.`);
        document.getElementById("wa-share-link").href = `https://wa.me/${OWNER_PHONE}?text=${waMsg}`;
    }
}

// কী সাবমিট ভ্যালিডেশন
function submitProductKey() {
    let userKey = document.getElementById("input-product-key").value.trim();
    let deviceId = getDeviceId();

    if (!userKey) {
        alert("দয়া করে Product Key প্রবেশ করান!");
        return;
    }

    // মাস্টার কী চেক
    if (userKey === MASTER_KEY) {
        let farFuture = new Date().getTime() + (3650 * 24 * 60 * 60 * 1000); // ১০ বছর
        localStorage.setItem("app_activated", "true");
        localStorage.setItem("app_expiry", farFuture.toString());
        alert("🎉 Master Access Granted! Unlimited Lifetime Access.");
        checkAppActivation();
        return;
    }

    // কাস্টমার কী চেক
    try {
        let decoded = atob(userKey);
        let parts = decoded.split("_");

        if (parts.length === 3 && parts[0] === deviceId && parts[2] === "THAI_GLASS_SECRET_2026") {
            let expiryTimestamp = parseInt(parts[1]);
            let now = new Date().getTime();

            if (now < expiryTimestamp) {
                localStorage.setItem("app_activated", "true");
                localStorage.setItem("app_expiry", expiryTimestamp.toString());
                alert("✅ Product Key Activated Successfully!");
                checkAppActivation();
            } else {
                alert("❌ এই Product Key-এর মেয়াদ শেষ হয়ে গেছে!");
            }
        } else {
            alert("❌ ভুল Product Key! আপনার Device ID-এর সাথে মিলছে না।");
        }
    } catch (e) {
        alert("❌ অবৈধ/ভুল Product Key!");
    }
}
