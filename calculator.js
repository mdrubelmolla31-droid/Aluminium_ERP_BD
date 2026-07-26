const MASTER_KEY = "THAI-BOSS-2026";
const OWNER_PHONE = "8801700000000"; // তোমার হোয়াটসঅ্যাপ নম্বর বসাও

document.addEventListener("DOMContentLoaded", () => {
    // স্প্ল্যাশ স্ক্রিন
    setTimeout(() => {
        const splash = document.getElementById("splash-screen");
        if (splash) {
            splash.style.opacity = "0";
            setTimeout(() => {
                splash.style.display = "none";
                checkAppActivation();
            }, 500);
        }
    }, 2000);

    // গোপন ৫-ট্যাপ সিক্রেট এডমিন ট্রিক
    let tapCount = 0;
    const secretTapBtn = document.getElementById("secret-logo-tap");
    if (secretTapBtn) {
        secretTapBtn.addEventListener("click", () => {
            tapCount++;
            if (tapCount === 5) {
                tapCount = 0;
                document.getElementById("input-product-key").value = MASTER_KEY;
                alert("👑 Master Key Auto-Applied!");
            }
        });
    }
});

function getDeviceId() {
    let devId = localStorage.getItem("app_device_id");
    if (!devId) {
        devId = "THAI-" + Math.floor(1000 + Math.random() * 9000);
        localStorage.setItem("app_device_id", devId);
    }
    return devId;
}

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

        let waMsg = encodeURIComponent(`Hello, my Device ID is: ${deviceId}. I need Product Key for Thai Calculator.`);
        document.getElementById("wa-share-link").href = `https://wa.me/${OWNER_PHONE}?text=${waMsg}`;
    }
}

function submitProductKey() {
    let userKey = document.getElementById("input-product-key").value.trim();
    let deviceId = getDeviceId();

    if (!userKey) {
        alert("দয়া করে Product Key প্রবেশ করান!");
        return;
    }

    if (userKey === MASTER_KEY) {
        let farFuture = new Date().getTime() + (3650 * 24 * 60 * 60 * 1000);
        localStorage.setItem("app_activated", "true");
        localStorage.setItem("app_expiry", farFuture.toString());
        alert("🎉 Master Key Accepted! Lifetime Access Granted.");
        checkAppActivation();
        return;
    }

    try {
        let decoded = atob(userKey);
        let parts = decoded.split("_");

        if (parts.length === 3 && parts[0] === deviceId && parts[2] === "THAI_GLASS_SECRET_2026") {
            let expiryTimestamp = parseInt(parts[1]);
            let now = new Date().getTime();

            if (now < expiryTimestamp) {
                localStorage.setItem("app_activated", "true");
                localStorage.setItem("app_expiry", expiryTimestamp.toString());
                alert("✅ Activated Successfully!");
                checkAppActivation();
            } else {
                alert("❌ Product Key-এর মেয়াদ শেষ!");
            }
        } else {
            alert("❌ ভুল Product Key!");
        }
    } catch (e) {
        alert("❌ অবৈধ Product Key!");
    }
}
